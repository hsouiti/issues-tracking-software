export interface User {
  name: string;
  email: string;
  password: string;
}

export type AuthState = {
  user: User | null;
  token: string | null;
};
