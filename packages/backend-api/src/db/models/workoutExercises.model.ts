import { Sequelize, Model, DataTypes } from 'sequelize';

import Exercises from './exercises.model';
import Workouts from './workouts.model';

class WorkoutExercises extends Model {
  public id!: number;

  public workoutId!: number;

  public exerciseId!: number;

  public sets: string;

  public reps: string;

  public weight: string;

  public duration: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return WorkoutExercises.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        sets: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
        reps: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        weight: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
        duration: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: 'workoutExercises',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Workouts);
    this.belongsTo(Exercises);
  }
}

export default WorkoutExercises;
