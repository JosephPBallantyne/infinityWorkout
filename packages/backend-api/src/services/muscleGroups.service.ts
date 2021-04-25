import MuscleGroupModel from '../db/models/muscleGroups.model';
import { MuscleGroup } from '../types/muscleGroups.type';
import logger from '../utils/logger';

class muscleGroupService {
  public muscleGroupModel = MuscleGroupModel;

  public async findAllMuscleGroups(): Promise<MuscleGroup[]> {
    let results: MuscleGroupModel[] = [];
    try {
      results = await this.muscleGroupModel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Muscle Group Service',
        message: err.stack,
      });
    }
    const muscleGroupList: MuscleGroup[] = results.map((result) => {
      const muscleGroup: MuscleGroup = result.toJSON() as MuscleGroup;
      return muscleGroup;
    });
    return muscleGroupList || [];
  }
}

export default muscleGroupService;
