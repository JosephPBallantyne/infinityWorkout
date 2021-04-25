import { Sequelize, Model, DataTypes } from 'sequelize';

import TrainingTypes from './trainingTypes.model';
import Equipment from './equipment.model';
import Users from './users.model';
import ExerciseMuscles from './exerciseMuscles.model';
import ExerciseMuscleGroups from './exerciseMuscleGroups.model';
import FavouritedExercises from './favouritedExercises.model';

class Exercises extends Model {
  public id!: number;

  public name!: string;

  public trainingTypeId!: number;

  public equipmentId!: number;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return Exercises.init(
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
        paranoid: true,
        modelName: 'exercises',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(TrainingTypes);
    this.belongsTo(Equipment);
    this.belongsTo(Users);
    this.hasMany(ExerciseMuscles);
    this.hasMany(ExerciseMuscleGroups);
    this.hasMany(FavouritedExercises);
  }
}

export default Exercises;
