import { Sequelize, Model, DataTypes } from 'sequelize';

import Users from './users.model';

class Workouts extends Model {
  public id!: number;

  public name!: string;

  public notes: string;

  public isPrivate!: boolean;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return Workouts.init(
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
        notes: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        isPrivate: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: 'workouts',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Users);
  }
}

export default Workouts;
