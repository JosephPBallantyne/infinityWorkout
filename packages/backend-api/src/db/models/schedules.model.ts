import { Sequelize, Model, DataTypes } from 'sequelize';

import Users from './users.model';

class Schedules extends Model {
  public id!: number;

  public name!: string;

  public durationDays!: number;

  public isPrivate!: boolean;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return Schedules.init(
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
        durationDays: {
          type: DataTypes.INTEGER,
          validate: { is: /7|14/i },
          allowNull: false,
        },
        isPrivate: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: 'schedules',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Users);
  }
}

export default Schedules;
