import { Sequelize, Model, DataTypes } from 'sequelize';

import Exercises from './exercises.model';
import Users from './users.model';

class FavouritedExercises extends Model {
  public id!: number;

  public exerciseId!: number;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  public static initModel(sequelize: Sequelize): void {
    return FavouritedExercises.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: 'favouritedExercises',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Users);
    this.belongsTo(Exercises);
  }
}

export default FavouritedExercises;
