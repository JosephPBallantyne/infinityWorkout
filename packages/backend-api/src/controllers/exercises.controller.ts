import { NextFunction, Response } from 'express';
import ExerciseService from '../services/exercises.service';
import ExerciseMuscleGroupService from '../services/exerciseMuscleGroups.service';
import ExerciseMuscleService from '../services/exerciseMuscles.service';
import EquipmentService from '../services/equipment.service';
import MuscleGroupService from '../services/muscleGroups.service';
import MusclesService from '../services/muscles.service';
import TrainingTypeService from '../services/trainingType.service';
import { RequestWithIdentity } from '../types/auth.type';
import {
  Exercise,
  ExerciseData,
  CreateExerciseOptions,
} from '../types/exercises.type';
import { Equipment } from '../types/equipment.type';
import { Muscle } from '../types/muscles.type';
import { MuscleGroup } from '../types/muscleGroups.type';
import { TrainingType } from '../types/trainingTypes.type';

class ExercisesController {
  public exerciseService = new ExerciseService();

  public equipmentService = new EquipmentService();

  public muscleGroupsService = new MuscleGroupService();

  public musclesService = new MusclesService();

  public trainingTypeService = new TrainingTypeService();

  public exerciseMuscleGroupService = new ExerciseMuscleGroupService();

  public exerciseMuscleService = new ExerciseMuscleService();

  public getExercises = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const exercises = await this.exerciseService.findAllExercises();
      res.status(200).json({ data: exercises, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getExerciseById = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const exerciseId = Number(req.params.id);
    try {
      const exercise: Exercise = await this.exerciseService.findExerciseById(
        exerciseId
      );
      const exerciseMuscleGroups = await this.exerciseMuscleGroupService.findExerciseMuscleGroupsByExerciseId(
        exerciseId
      );
      const muscleGroups = exerciseMuscleGroups.map(
        (exerciseMuscleGroup) => exerciseMuscleGroup.muscleGroup
      );
      const exerciseMuscles = await this.exerciseMuscleService.findExerciseMusclesByExerciseId(
        exerciseId
      );
      const muscles = exerciseMuscles.map(
        (exerciseMuscle) => exerciseMuscle.muscle
      );
      muscleGroups.forEach((group) => {
        // eslint-disable-next-line no-param-reassign
        group.muscles = [];
        muscles.forEach((muscle) => {
          if (group.id === muscle.muscleGroupId) {
            group.muscles.push(muscle);
          }
        });
      });
      const exerciseData = { ...exercise };
      exerciseData.muscleGroups = muscleGroups;
      res.status(200).json({ data: exerciseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCreateExerciseOptions = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const trainingTypes: TrainingType[] = await this.trainingTypeService.findAllTrainingTypes();
      const equipment: Equipment[] = await this.equipmentService.findAllEquipment();
      const muscles: Muscle[] = await this.musclesService.findAllMuscles();
      const muscleGroups: MuscleGroup[] = await this.muscleGroupsService.findAllMuscleGroups();
      const data: CreateExerciseOptions = {
        equipment,
        muscles,
        muscleGroups,
        trainingTypes,
      };
      res.status(200).json({
        data,
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getExerciseCards = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const exercises = await this.exerciseService.findAllExercises();
      const exerciseMuscleGroups = await this.exerciseMuscleGroupService.findAllExerciseMuscleGroups();

      exercises.map((exercise) => {
        const muscleGroup: any[] = [];
        Object.values(exerciseMuscleGroups).filter((group) => {
          if (exercise.id === group.exerciseId) {
            muscleGroup.push(group.muscleGroup);
          }
          return muscleGroup;
        });
        // eslint-disable-next-line no-param-reassign
        exercise.muscleGroup = muscleGroup;
        return exercise;
      });

      res.status(200).json({
        data: exercises,
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public createExercise = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const exerciseData: ExerciseData = req.body;
    try {
      const exercise: Exercise = await this.exerciseService.createExercise(
        userId,
        exerciseData
      );
      const exerciseId = exercise.id;
      const { muscleGroupIds, muscleIds } = exerciseData;
      await Promise.all(
        muscleGroupIds.map((id) => {
          return this.exerciseService.createExerciseMuscleGroup(exerciseId, id);
        })
      );
      if (muscleIds) {
        await Promise.all(
          muscleIds.map((id) => {
            return this.exerciseService.createExerciseMuscle(exerciseId, id);
          })
        );
      }
      res.status(201).json({ message: 'Exercise created' });
    } catch (error) {
      next(error);
    }
  };

  public updateExercise = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const exerciseId = Number(req.params.id);
    const exerciseData: ExerciseData = req.body;
    try {
      const updatedExercise: Exercise = await this.exerciseService.updateExercise(
        userId,
        exerciseId,
        exerciseData
      );
      res
        .status(200)
        .json({ data: updatedExercise.id, message: 'Exercise updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteExercise = async (
    req: RequestWithIdentity,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const exerciseId = Number(req.params.id);
    try {
      const deletedExerciseId: number = await this.exerciseService.deleteExerciseData(
        userId,
        exerciseId
      );
      res.status(200).json({ data: deletedExerciseId, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ExercisesController;
