export interface Exercise {
  id: number;
  name: string;
  trainingTypeId: number;
  equipmentId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  muscleGroups: any;
}

export interface ExerciseMuscle {
  exerciseId: number;
  muscleId: number;
}

export interface ExerciseData {
  name: string;
  trainingTypeId: number;
  equipmentId: number;
  muscleGroupIds: number[];
  muscleIds: number[];
}

export interface CreateExerciseOptions {
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

export interface ExerciseCard {
  id: number;
  name: string;
  createdAt: Date;
  user: {
    username: string;
  };
  trainingType: {
    name: string;
  };
  equipment: {
    name: string;
  };
  muscleGroup: {
    id: number;
    name: string;
  }[];
  commentsTotal: number;
  likesTotal: number;
  isLiked: boolean;
  isBookmarked: boolean;
}
