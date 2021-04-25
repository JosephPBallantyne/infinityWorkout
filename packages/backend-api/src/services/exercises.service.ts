import ExerciseModel from '../db/models/exercises.model';
import UserModel from '../db/models/users.model';
import EquipmentModel from '../db/models/equipment.model';
import TrainingTypeModel from '../db/models/trainingTypes.model';
import ExerciseMuscleGroupModel from '../db/models/exerciseMuscleGroups.model';
import ExerciseMuscleModel from '../db/models/exerciseMuscles.model';
import {
  Exercise,
  ExerciseCard,
  ExerciseData,
  ExerciseMuscle,
} from '../types/exercises.type';
import { ExerciseMuscleGroup } from '../types/exerciseMuscleGroups.type';
import logger from '../utils/logger';
import HttpException from '../exceptions/HttpException';

class ExerciseService {
  public exerciseModel = ExerciseModel;

  public exerciseMuscleGroupModel = ExerciseMuscleGroupModel;

  public exerciseMuscleModel = ExerciseMuscleModel;

  public async findAllExercises(): Promise<ExerciseCard[]> {
    let results: ExerciseModel[] = [];
    try {
      results = await this.exerciseModel.findAll({
        attributes: ['id', 'name', 'createdAt'],
        include: [
          {
            model: UserModel,
            attributes: ['username'],
          },
          {
            model: EquipmentModel,
            attributes: ['name'],
          },
          {
            model: TrainingTypeModel,
            attributes: ['name'],
          },
        ],
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Exercise Service',
        message: err.stack,
      });
    }
    const exerciseList: ExerciseCard[] = results.map((result) => {
      const exercise: ExerciseCard = result.toJSON() as ExerciseCard;
      return exercise;
    });
    return exerciseList || [];
  }

  public async findExerciseById(exerciseId: number): Promise<Exercise> {
    try {
      const result = await this.exerciseModel.findOne({
        where: { id: exerciseId },
        attributes: ['id', 'name', 'createdAt'],
        include: [
          {
            model: UserModel,
            attributes: ['username'],
          },
          {
            model: EquipmentModel,
            attributes: ['name'],
          },
          {
            model: TrainingTypeModel,
            attributes: ['name'],
          },
        ],
      });
      if (!result) throw new HttpException(409, 'Exercise not found');
      return result.toJSON() as Exercise;
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Exercise Service',
        message: err.stack,
      });
      throw new HttpException(409, 'Exercise not found');
    }
  }

  public async createExercise(
    userId: number,
    exerciseData: ExerciseData
  ): Promise<Exercise> {
    const { name, trainingTypeId, equipmentId } = exerciseData;
    const createResult: ExerciseModel = await this.exerciseModel.create({
      name,
      trainingTypeId,
      equipmentId,
      userId,
    });
    return createResult.toJSON() as Exercise;
  }

  public async updateExercise(
    userId: number,
    exerciseId: number,
    exerciseData: ExerciseData
  ): Promise<Exercise> {
    const { name, trainingTypeId, equipmentId } = exerciseData;
    const [, updateResult]: [
      number,
      ExerciseModel[]
    ] = await this.exerciseModel.update(
      { name, trainingTypeId, equipmentId },
      {
        where: { id: exerciseId, userId },
        returning: true,
      }
    );
    return updateResult[0].toJSON() as Exercise;
  }

  public async deleteExerciseData(
    userId: number,
    exerciseId: number
  ): Promise<number> {
    try {
      await this.exerciseModel.destroy({ where: { id: exerciseId, userId } });
    } catch (err) {
      throw new HttpException(409, `Unable to delete exercise: ${exerciseId}`);
    }
    return exerciseId;
  }

  public async createExerciseMuscleGroup(
    exerciseId: number,
    muscleGroupId: number
  ): Promise<ExerciseMuscleGroup> {
    const createResult: ExerciseMuscleGroupModel = await this.exerciseMuscleGroupModel.create(
      {
        exerciseId,
        muscleGroupId,
      }
    );
    return createResult.toJSON() as ExerciseMuscleGroup;
  }

  public async createExerciseMuscle(
    exerciseId: number,
    muscleId: number
  ): Promise<ExerciseMuscle> {
    const createResult: ExerciseMuscleModel = await this.exerciseMuscleModel.create(
      {
        exerciseId,
        muscleId,
      }
    );
    return createResult.toJSON() as ExerciseMuscle;
  }
}

export default ExerciseService;
