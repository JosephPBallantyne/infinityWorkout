import { Sequelize, Model, DataTypes } from 'sequelize';

import Exercises from './exercises.model';
import Muscles from './muscles.model';

class ExerciseMuscles extends Model {
  public id!: number;

  public exerciseId!: number;

  public muscleId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return ExerciseMuscles.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: 'exerciseMuscles',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Muscles);
    this.belongsTo(Exercises);
  }
}

export default ExerciseMuscles;
