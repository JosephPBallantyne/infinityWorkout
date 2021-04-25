import { Sequelize, Model, DataTypes } from 'sequelize';
import Exercises from './exercises.model';

class Equipment extends Model {
  public id!: number;

  public name!: string;

  public abbreviation!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return Equipment.init(
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
        abbreviation: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'equipment',
      }
    );
  }

  public static initAssocation(): void {
    this.hasMany(Exercises);
  }
}

export default Equipment;
