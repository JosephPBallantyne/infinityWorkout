import ExerciseMuscleModel from '../db/models/exerciseMuscles.model';
import { ExerciseMuscle } from '../types/exerciseMuscle.type';
import MuscleModel from '../db/models/muscles.model';
import logger from '../utils/logger';
import HttpException from '../exceptions/HttpException';

class exerciseMuscleGroupService {
  public exerciseMuscleModel = ExerciseMuscleModel;

  public async findAllExerciseMuscles(): Promise<ExerciseMuscle[]> {
    let results: ExerciseMuscleModel[] = [];
    try {
      results = await this.exerciseMuscleModel.findAll({
        attributes: ['id', 'exerciseId'],
        include: [
          {
            model: MuscleModel,
            attributes: ['id', 'name'],
          },
        ],
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Exercise Muscle Service',
        message: err.stack,
      });
    }
    const exerciseMuscleList: ExerciseMuscle[] = results.map((result) => {
      const exerciseMuscle: ExerciseMuscle = result.toJSON() as ExerciseMuscle;
      return exerciseMuscle;
    });
    return exerciseMuscleList || [];
  }

  public async findExerciseMusclesByExerciseId(
    exerciseId: number
  ): Promise<ExerciseMuscle[]> {
    try {
      const result = await this.exerciseMuscleModel.findAll({
        where: { exerciseId },
        attributes: ['id', 'exerciseId', 'muscleId'],
        include: [
          {
            model: MuscleModel,
            attributes: ['id', 'name', 'commonName', 'head', 'muscleGroupId'],
          },
        ],
      });
      if (!result) throw new HttpException(409, 'Exercise muscle not found');
      return result.map((item) => item.toJSON() as ExerciseMuscle);
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Exercise Muscle Service',
        message: err.stack,
      });
      throw new HttpException(409, 'Exercise muscle not found');
    }
  }
}

export default exerciseMuscleGroupService;
