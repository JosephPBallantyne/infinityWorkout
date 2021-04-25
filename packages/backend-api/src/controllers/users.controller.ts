import { NextFunction, Request, Response } from 'express';
import { pick } from 'lodash';
import { RequestWithIdentity } from '../types/auth.type';
import { User, UserPublic, UserData } from '../types/users.type';
import UserService from '../services/users.service';

class UsersController {
  public userService = new UserService();

  public getUsers = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users: User[] = await this.userService.findAllUser();
      const usersPublic: UserPublic[] = users.map(
        (user) => pick(user, ['id', 'email']) as UserPublic
      );
      res.status(200).json({ data: usersPublic, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    try {
      const user: User = await this.userService.findUserById(userId);
      const userPublic: UserPublic = pick(user, [
        'id',
        'email',
        'username',
      ]) as UserPublic;
      res.status(200).json({ data: userPublic, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: UserData = req.body;
    try {
      const createdUser: User = await this.userService.createUser(userData);
      const createdUserPublic: UserPublic = pick(createdUser, [
        'id',
        'email',
      ]) as UserPublic;
      res.status(201).json({ data: createdUserPublic, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = Number(req.params.id);
    const userData: UserData = req.body;
    try {
      const updatedUser: User = await this.userService.updateUser(
        userId,
        userData
      );
      const updatedUserPublic: UserPublic = pick(updatedUser, [
        'id',
        'email',
      ]) as UserPublic;
      res.status(200).json({ data: updatedUserPublic, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = Number(req.params.id);
    try {
      const deletedUserId: number = await this.userService.deleteUserData(
        userId
      );
      res.status(200).json({ data: deletedUserId, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
