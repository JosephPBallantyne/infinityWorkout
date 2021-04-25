import { Sequelize, Model, DataTypes } from 'sequelize';
import FavouritedExercises from './favouritedExercises.model';

class User extends Model {
  public id!: number;

  public username: string;

  public email!: string;

  public password!: string;

  public isActive: boolean;

  public passwordResetToken: string;

  public passwordResetTokenExpiredAt: Date;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: new DataTypes.STRING(255),
          unique: true,
          allowNull: true,
        },
        email: {
          type: new DataTypes.STRING(255),
          unique: true,
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        passwordResetToken: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        passwordResetTokenExpiredAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: 'user',
      }
    );
  }

  public static initAssocation(): void {
    this.hasMany(FavouritedExercises);
  }
}

export default User;
