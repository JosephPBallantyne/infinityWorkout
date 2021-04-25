import bcrypt from 'bcryptjs';
import HttpException from '../exceptions/HttpException';
import { User, UserData } from '../types/users.type';
import UserModel from '../db/models/users.model';
import { isEmptyObject } from '../utils/util';
import logger from '../utils/logger';

class UserService {
  public userModel = UserModel;

  public async findAllUser(): Promise<User[]> {
    let results: UserModel[] = [];
    try {
      results = await this.userModel.findAll();
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'User Service',
        message: err.stack,
      });
    }
    const userList: User[] = results.map((result) => {
      const user: User = result.toJSON() as User;
      return user;
    });
    return userList || [];
  }

  public async findUserById(userId: number): Promise<User> {
    const result: UserModel = await this.userModel.findByPk(userId);
    if (!result) throw new HttpException(409, 'User not found');
    return result.toJSON() as User;
  }

  public async createUser(userData: UserData): Promise<User> {
    if (isEmptyObject(userData))
      throw new HttpException(400, 'User data missing');
    const findResult: UserModel = await this.userModel.findOne({
      where: {
        email: userData.email,
      },
    });
    if (findResult)
      throw new HttpException(409, `Email ${userData.email} already exists`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createResult: UserModel = await this.userModel.create({
      ...userData,
      password: hashedPassword,
      isActive: true,
    });
    return createResult.toJSON() as User;
  }

  public async updateUser(userId: number, userData: UserData): Promise<User> {
    if (isEmptyObject(userData))
      throw new HttpException(400, 'User data missing');
    const [, updateResult]: [number, UserModel[]] = await this.userModel.update(
      { ...userData },
      {
        where: { id: userId },
        returning: true,
      }
    );
    if (!updateResult)
      throw new HttpException(409, `Unable to update user: ${userId}`);
    return updateResult[0].toJSON() as User;
  }

  public async deleteUserData(userId: number): Promise<number> {
    try {
      await this.userModel.destroy({ where: { id: userId } });
    } catch (err) {
      throw new HttpException(409, `Unable to delete user: ${userId}`);
    }
    return userId;
  }
}

export default UserService;
