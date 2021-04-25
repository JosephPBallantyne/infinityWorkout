import EquipmentModel from '../db/models/equipment.model';
import { Equipment } from '../types/equipment.type';
import logger from '../utils/logger';

class equipmentService {
  public equipmentModel = EquipmentModel;

  public async findAllEquipment(): Promise<Equipment[]> {
    let results: EquipmentModel[] = [];
    try {
      results = await this.equipmentModel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } catch (err) {
      logger.log({
        level: 'error',
        label: 'Equipment Service',
        message: err.stack,
      });
    }
    const equipmentList: Equipment[] = results.map((result) => {
      const equipment: Equipment = result.toJSON() as Equipment;
      return equipment;
    });
    return equipmentList || [];
  }
}

export default equipmentService;
