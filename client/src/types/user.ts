export interface UserInterface {
  id: string;
  username: string;
  avatar: string | null;
  description: string;
}

export interface UserSigninInterface {
  email: string;
  password: string;
}

export interface UserSignupInterface {
  email: string;
  username: string;
  password: string;
  avatar: any;
  description: string;
}
