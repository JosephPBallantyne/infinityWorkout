import { Router } from 'express';
import { WorkoutController } from '../controllers';
import { Route } from '../types/routes.type';
import authMiddleware from '../middlewares/auth.middleware';
import userMiddleware from '../middlewares/user.middleware';

class WorkoutRoute implements Route {
  public path = '/api/workouts';

  public router = Router();

  public workoutController = new WorkoutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      userMiddleware,
      this.workoutController.getWorkouts
    );
    this.router.get(
      `${this.path}/user`,
      authMiddleware,
      this.workoutController.getWorkoutsUser
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.workoutController.getWorkoutById
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      this.workoutController.createWorkout
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.workoutController.updateWorkout
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.workoutController.deleteWorkout
    );
  }
}

export default WorkoutRoute;
