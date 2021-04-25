import { Sequelize, Model, DataTypes } from 'sequelize';

import Exercises from './exercises.model';
import MuscleGroups from './muscleGroups.model';

class ExerciseMuscleGroups extends Model {
  public id!: number;

  public exerciseId!: number;

  public muscleGroupId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return ExerciseMuscleGroups.init(
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
        modelName: 'exerciseMuscleGroups',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(MuscleGroups);
    this.belongsTo(Exercises);
  }
}

export default ExerciseMuscleGroups;
