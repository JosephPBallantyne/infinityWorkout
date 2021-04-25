import { Router } from 'express';
import { ExerciseController } from '../controllers';
import { Route } from '../types/routes.type';
import authMiddleware from '../middlewares/auth.middleware';

class ExercisesRoute implements Route {
  public path = '/api/exercises';

  public router = Router();

  public exercisesController = new ExerciseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.exercisesController.getExercises);
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.exercisesController.getExerciseById
    );
    this.router.get(
      `${this.path}/options`,
      this.exercisesController.getCreateExerciseOptions
    );
    this.router.get(
      `${this.path}/cards`,
      this.exercisesController.getExerciseCards
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      this.exercisesController.createExercise
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.exercisesController.updateExercise
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.exercisesController.deleteExercise
    );
  }
}

export default ExercisesRoute;
