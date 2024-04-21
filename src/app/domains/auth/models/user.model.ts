export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
