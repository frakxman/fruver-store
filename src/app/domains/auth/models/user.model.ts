export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

export interface Admin extends User {
  role: 'admin';
}
