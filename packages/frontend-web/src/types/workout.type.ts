export interface CreateWorkout {
  name: string;
  notes: string;
  isPrivate: boolean;
}

export interface WorkoutCardData {
  id?: number;
  name: string;
  username: string;
  //   createdAt: Date;
}
