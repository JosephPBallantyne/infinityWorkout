import { Sequelize } from 'sequelize';
import Equipment from './equipment.model';
import ExerciseMuscleGroups from './exerciseMuscleGroups.model';
import ExerciseMuscles from './exerciseMuscles.model';
import Exercises from './exercises.model';
import FavouritedExercises from './favouritedExercises.model';
import MuscleGroups from './muscleGroups.model';
import Muscles from './muscles.model';
import TrainingTypes from './trainingTypes.model';
import Users from './users.model';
import Workouts from './workouts.model';
import WorkoutExercises from './workoutExercises.model';

console.info('Initializing sequelize...');
export const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      min: 0,
      max: 30,
      idle: 10000,
      acquire: 30000,
    },
    dialectOptions: {
      socketPath: process.env.POSTGRES_HOST,
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initModels = async (sequelizeInst: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
  console.info('Initializing sequelize models...');
  Equipment.initModel(sequelizeInst);
  ExerciseMuscleGroups.initModel(sequelizeInst);
  ExerciseMuscles.initModel(sequelizeInst);
  Exercises.initModel(sequelizeInst);
  FavouritedExercises.initModel(sequelizeInst);
  MuscleGroups.initModel(sequelizeInst);
  Muscles.initModel(sequelizeInst);
  TrainingTypes.initModel(sequelizeInst);
  Users.initModel(sequelizeInst);
  Workouts.initModel(sequelizeInst);
  WorkoutExercises.initModel(sequelizeInst);
};

export const initAssociation = async () => {
  console.info('Initializing sequelize associations...');
  Equipment.initAssocation();
  ExerciseMuscleGroups.initAssocation();
  ExerciseMuscles.initAssocation();
  Exercises.initAssocation();
  FavouritedExercises.initAssocation();
  MuscleGroups.initAssocation();
  Muscles.initAssocation();
  TrainingTypes.initAssocation();
  Users.initAssocation();
  Workouts.initAssocation();
  WorkoutExercises.initAssocation();
};
