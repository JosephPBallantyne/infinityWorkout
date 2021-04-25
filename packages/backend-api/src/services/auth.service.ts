import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../types/auth.type';
import { User } from '../types/users.type';
import UserModel from '../db/models/users.model';
import { isEmptyObject } from '../utils/util';

class AuthService {
  public userModel = UserModel;

  public async reAuth(userId: number): Promise<User> {
    if (!userId) {
      throw new HttpException(403, 'Authentication failed');
    }
    const user: UserModel = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException(403, 'Authentication failed');
    }
    return user.toJSON() as User;
  }

  public async signup(userData: any): Promise<User> {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, 'userData missing');
    }
    const foundUser: UserModel = await this.userModel.findOne({
      where: { email: userData.email },
    });
    if (foundUser)
      throw new HttpException(409, `Email ${userData.email} already exists`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser: UserModel = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });
    return createdUser.toJSON() as User;
  }

  public async login(userData: any): Promise<{ cookie: string; user: User }> {
    if (isEmptyObject(userData))
      throw new HttpException(400, 'userData missing');
    const foundResult: UserModel = await this.userModel.findOne({
      where: { email: userData.email },
    });
    if (!foundResult)
      throw new HttpException(409, `Email address ${userData.email} not found`);
    const foundUser: User = foundResult.toJSON() as User;
    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      foundUser.password
    );
    if (!isPasswordMatching) throw new HttpException(409, 'Password not found');
    const tokenData = AuthService.createJwtToken(foundUser);
    const cookie = AuthService.createCookie(tokenData);
    return {
      cookie,
      user: foundUser,
    };
  }

  public async logout(userId: number): Promise<User> {
    if (!userId) {
      throw new HttpException(400, 'userData missing');
    }
    const foundUser: UserModel = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!foundUser) throw new HttpException(409, 'User not found');
    return foundUser.toJSON() as User;
  }

  public static createJwtToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  public static createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Path=/; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
