export interface ExerciseMuscleGroup {
  id: number;
  exerciseId: number;
  muscleGroup: {
    id: number;
    name: string;
    muscles?: any[];
  };
}
