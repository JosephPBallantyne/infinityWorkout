import ExerciseMuscleGroupModel from '../db/models/exerciseMuscleGroups.model';
import { ExerciseMuscleGroup } from '../types/exerciseMuscleGroups.type';
import MuscleGroupModel from '../db/models/muscleGroups.model';
import logger from '../utils/logger';
import HttpException from '../exceptions/HttpException';

class exerciseMuscleGroupService {
  public exerciseMuscleGroupModel = ExerciseMuscleGroupModel;

  public async findAllExerciseMuscleGroups(): Promise<ExerciseMuscleGroup[]> {
    let results: ExerciseMuscleGroupModel[] = [];
    try {
      results = await this.exerciseMuscleGroupModel.findAll({
        attributes: ['id', 'exerciseId'],
        include: [
          {
            model: MuscleGroupModel,
            attributes: ['id', 'name'],
          },
        ],
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Exercise Muscle Group Service',
        message: err.stack,
      });
    }
    const exerciseMuscleGroupList: ExerciseMuscleGroup[] = results.map(
      (result) => {
        const exerciseMuscleGroup: ExerciseMuscleGroup = result.toJSON() as ExerciseMuscleGroup;
        return exerciseMuscleGroup;
      }
    );
    return exerciseMuscleGroupList || [];
  }

  public async findExerciseMuscleGroupsByExerciseId(
    exerciseId: number
  ): Promise<ExerciseMuscleGroup[]> {
    try {
      const result = await this.exerciseMuscleGroupModel.findAll({
        where: { exerciseId },
        attributes: ['id', 'exerciseId', 'muscleGroupId'],
        include: [
          {
            model: MuscleGroupModel,
            attributes: ['id', 'name'],
          },
        ],
      });
      if (!result)
        throw new HttpException(409, 'Exercise muscle group not found');
      return result.map((item) => item.toJSON() as ExerciseMuscleGroup);
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Exercise Muscle Group Service',
        message: err.stack,
      });
      throw new HttpException(409, 'Exercise muscle group not found');
    }
  }
}

export default exerciseMuscleGroupService;
