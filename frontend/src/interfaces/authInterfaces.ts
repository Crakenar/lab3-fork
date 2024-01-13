export interface User {
  username: string;
  password: string;
}

export interface UserRegister extends User {
  email: string;
}