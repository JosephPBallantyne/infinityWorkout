export interface User {
  id: number;
  email: string;
  password: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserPublic {
  id: number;
  email: string;
  username?: string;
}

export interface UserData {
  id: number;
  username?: string;
  email: string;
  password: string;
  passwordResetToken?: string | null;
  passwordResetTokenExpiredAt?: Date | null;
}
