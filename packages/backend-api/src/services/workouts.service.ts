import { Op } from 'sequelize';
import WorkoutModel from '../db/models/workouts.model';
import WorkoutExerciseModel from '../db/models/workoutExercises.model';
import {
  Workout,
  WorkoutData,
  WorkoutExercise,
  WorkoutExerciseData,
  WorkoutPublic,
} from '../types/workouts.type';
import logger from '../utils/logger';
import HttpException from '../exceptions/HttpException';

class WorkoutService {
  public workoutModel = WorkoutModel;

  public workoutExerciseModel = WorkoutExerciseModel;

  public async findAllWorkouts(userId: number | null): Promise<Workout[]> {
    let results: WorkoutModel[] = [];
    try {
      results = await this.workoutModel.findAll({
        where: { [Op.or]: [{ userId }, { isPrivate: false }] },
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Workout Service',
        message: err.stack,
      });
    }
    const workoutList: Workout[] = results.map((result) => {
      const workout: Workout = result.toJSON() as Workout;
      return workout;
    });
    return workoutList || [];
  }

  public async findUserWorkouts(userId: number): Promise<Workout[]> {
    let results: WorkoutModel[] = [];
    try {
      results = await this.workoutModel.findAll({
        where: { userId },
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Workout Service',
        message: err.stack,
      });
    }
    const workoutList: Workout[] = results.map((result) => {
      const workout: Workout = result.toJSON() as Workout;
      return workout;
    });
    return workoutList || [];
  }

  public async findWorkoutById(workoutId: number): Promise<Workout> {
    const result: WorkoutModel = await this.workoutModel.findByPk(workoutId);
    if (!result) throw new HttpException(409, 'Workout not found');
    return result.toJSON() as Workout;
  }

  public async createWorkout(
    userId: number,
    workoutData: WorkoutData
  ): Promise<WorkoutPublic> {
    try {
      const { name, notes, isPrivate } = workoutData;
      const createResult: WorkoutModel = await this.workoutModel.create({
        name,
        notes,
        isPrivate,
        userId,
      });
      return createResult.toJSON() as WorkoutPublic;
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Workout Service',
        message: err.stack,
      });
      throw new HttpException(409, 'Workout not created');
    }
  }

  public async createWorkoutExercise(
    workoutExerciseData: WorkoutExerciseData
  ): Promise<WorkoutExercise> {
    const createResult: WorkoutExerciseModel = await this.workoutExerciseModel.create(
      {
        ...workoutExerciseData,
      }
    );
    return createResult.toJSON() as WorkoutExercise;
  }

  public async updateWorkout(
    userId: number,
    workoutId: number,
    workoutData: WorkoutData
  ): Promise<Workout> {
    const { name, notes, isPrivate } = workoutData;
    const [, updateResult]: [
      number,
      WorkoutModel[]
    ] = await this.workoutModel.update(
      { name, notes, isPrivate },
      {
        where: { id: workoutId, userId },
        returning: true,
      }
    );
    return updateResult[0].toJSON() as Workout;
  }

  public async deleteWorkoutData(
    userId: number,
    workoutId: number
  ): Promise<number> {
    try {
      await this.workoutModel.destroy({ where: { id: workoutId, userId } });
    } catch (err) {
      throw new HttpException(409, `Unable to delete workout: ${workoutId}`);
    }
    return workoutId;
  }
}

export default WorkoutService;
