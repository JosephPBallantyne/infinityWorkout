import { Sequelize, Model, DataTypes } from 'sequelize';

import ExerciseMuscleGroups from './exerciseMuscleGroups.model';
import Muscles from './muscles.model';

class MuscleGroups extends Model {
  public id!: number;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return MuscleGroups.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(255),
          unique: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'muscleGroups',
      }
    );
  }

  public static initAssocation(): void {
    this.hasMany(ExerciseMuscleGroups);
    this.hasMany(Muscles);
  }
}

export default MuscleGroups;
