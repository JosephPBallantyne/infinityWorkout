export interface Workout {
  id: number;
  name: string;
  notes?: string;
  isPrivate: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WorkoutPublic {
  id: number;
  name: string;
  notes?: string;
}

export interface WorkoutData {
  name: string;
  notes?: string;
  isPrivate: boolean;
}

export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  sets?: string;
  reps?: string;
  weight?: string;
  duration?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface WorkoutExerciseData {
  workoutId: number;
  exerciseId: number;
  sets?: string;
  reps?: string;
  weight?: string;
  duration?: string;
}
