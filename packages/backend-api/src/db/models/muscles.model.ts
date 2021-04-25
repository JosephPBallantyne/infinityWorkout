import { Sequelize, Model, DataTypes } from 'sequelize';

import MuscleGroups from './muscleGroups.model';

class Muscles extends Model {
  public id!: number;

  public name!: string;

  public commonName: string;

  public head: string;

  public muscleGroupId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return Muscles.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
        commonName: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        head: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'muscles',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(MuscleGroups);
  }
}

export default Muscles;
