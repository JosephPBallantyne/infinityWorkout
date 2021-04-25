import { Sequelize, Model, DataTypes } from 'sequelize';

import Schedules from './schedules.model';
import Workouts from './workouts.model';

class ScheduleWorkouts extends Model {
  public id!: number;

  public workoutId!: number;

  public scheduleId!: number;

  public day: number;

  public time: Enumerator;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return ScheduleWorkouts.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        day: {
          type: DataTypes.INTEGER,
          validate: { is: /[0-13]/i },
          allowNull: false,
        },
        time: {
          type: DataTypes.ENUM,
          values: ['morning', 'afternoon', 'evening'],
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: 'scheduleWorkouts',
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Workouts);
    this.belongsTo(Schedules);
  }
}

export default ScheduleWorkouts;
