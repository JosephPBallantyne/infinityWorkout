export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
  username: string;
}

export interface User {
  authenticated: boolean;
  username?: string;
  email?: string;
}
