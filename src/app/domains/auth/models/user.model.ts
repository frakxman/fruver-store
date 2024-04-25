export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role: string;
}

export interface Admin extends User {
  role: 'admin';
}
