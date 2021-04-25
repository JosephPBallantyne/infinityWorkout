export interface ExerciseCardData {
  exercise: string;
  exerciseId: number;
  muscleGroup: string[];
  trainingType: string;
  equipment: string;
  username: string;
  createdAt: string;
  commentsTotal: number;
  likesTotal: number;
  isLiked: boolean;
  isBookmarked: boolean;
  workouts?: any;
}

export interface CreateExercise {
  name: string;
  trainingTypeId: number;
  equipmentId: number;
  muscleIds: number[];
  muscleGroupIds: number[];
  description: string;
  media?: any;
}

export interface StaticExerciseData {
  trainingTypes: {
    id: number;
    name: string;
  }[];
  equipment: {
    id: number;
    name: string;
  }[];
  muscleGroups: {
    id: number;
    name: string;
  }[];
  muscles: {
    id: number;
    name: string;
    commonName: string;
    head: string;
    muscleGroupId: number;
  }[];
}

export interface ExerciseViewData {
  id: number;
  name: string;
  createdAt: Date;
  user: {
    username: string;
  };
  equipment: {
    name: string;
  };
  trainingTypes: {
    name: string;
  };
  muscleGroups: {
    id: number;
    name: string;
    muscles: {
      id: number;
      name: string;
      commonName: string;
      head: string;
      muscleGroupId: number;
    }[];
  }[];
}
