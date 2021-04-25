import { Router } from 'express';
import { UserController } from '../controllers';
import { Route } from '../types/routes.type';
import authMiddleware from '../middlewares/auth.middleware';

class UsersRoute implements Route {
  public path = '/api/user';

  public router = Router();

  public usersController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.usersController.getUser
    );
    this.router.post(`${this.path}`, this.usersController.createUser);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.usersController.updateUser
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.usersController.deleteUser
    );
  }
}

export default UsersRoute;
