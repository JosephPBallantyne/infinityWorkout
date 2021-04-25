import TrainingTypeModel from '../db/models/trainingTypes.model';
import { TrainingType } from '../types/trainingTypes.type';
import logger from '../utils/logger';

class trainingTypeService {
  public trainingTypeModel = TrainingTypeModel;

  public async findAllTrainingTypes(): Promise<TrainingType[]> {
    let results: TrainingTypeModel[] = [];
    try {
      results = await this.trainingTypeModel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Training Type Service',
        message: err.stack,
      });
    }
    const trainingTypeList: TrainingType[] = results.map((result) => {
      const trainingType: TrainingType = result.toJSON() as TrainingType;
      return trainingType;
    });
    return trainingTypeList || [];
  }
}

export default trainingTypeService;
