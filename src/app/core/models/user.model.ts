export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}