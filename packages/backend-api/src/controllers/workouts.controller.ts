import { NextFunction, Response } from 'express';
import WorkoutService from '../services/workouts.service';
import { RequestWithIdentity } from '../types/auth.type';
import { Workout, WorkoutData } from '../types/workouts.type';

class WorkoutsController {
  public workoutService = new WorkoutService();

  public getWorkouts = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId || null;
    try {
      const workouts: Workout[] = await this.workoutService.findAllWorkouts(
        userId
      );
      res.status(200).json({ data: workouts, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkoutsUser = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId || null;
    try {
      const workouts: Workout[] = await this.workoutService.findUserWorkouts(
        userId
      );
      res.status(200).json({ data: workouts, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkoutById = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const workoutId = Number(req.params.id);
    try {
      const workout: Workout = await this.workoutService.findWorkoutById(
        workoutId
      );
      res.status(200).json({ data: workout, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createWorkout = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const workoutData: WorkoutData = req.body;
    try {
      const workout = await this.workoutService.createWorkout(
        userId,
        workoutData
      );
      res.status(201).json({ message: 'Workout created', data: workout });
    } catch (error) {
      next(error);
    }
  };

  public updateWorkout = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const workoutId = Number(req.params.id);
    const workoutData: WorkoutData = req.body;
    try {
      const updatedWorkout: Workout = await this.workoutService.updateWorkout(
        userId,
        workoutId,
        workoutData
      );
      res
        .status(200)
        .json({ data: updatedWorkout.id, message: 'Workout updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkout = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const workoutId = Number(req.params.id);
    try {
      const deletedWorkoutId: number = await this.workoutService.deleteWorkoutData(
        userId,
        workoutId
      );
      res.status(200).json({ data: deletedWorkoutId, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default WorkoutsController;
