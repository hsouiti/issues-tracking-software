export interface User {
  email: string;
  name: string;
  role: string;
}

export type AuthState = {
  user: User | null;
  token: string | null;
};

export interface IGenericResponse {
  status: string;
  message: string;
}
