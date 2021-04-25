export interface ExerciseMuscle {
  id: number;
  exerciseId: number;
  muscle: {
    id: number;
    name: string;
    commonName: string;
    head: string;
    muscleGroupId: number;
  };
}
