import MuscleModel from '../db/models/muscles.model';
import { Muscle } from '../types/muscles.type';
import logger from '../utils/logger';

class muscleService {
  public muscleModel = MuscleModel;

  public async findAllMuscles(): Promise<Muscle[]> {
    let results: MuscleModel[] = [];
    try {
      results = await this.muscleModel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Muscle Service',
        message: err.stack,
      });
    }
    const muscleList: Muscle[] = results.map((result) => {
      const muscle: Muscle = result.toJSON() as Muscle;
      return muscle;
    });
    return muscleList || [];
  }
}

export default muscleService;
