export interface ISignUp {
  username: string;
  password: string;
  confirm: string;
}
export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassWord: string;
}
export interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface ILogin {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface forgotPassword {
  email: string;
  otp?: string;
  newPassword?: string;
}

export interface IAbout {
  id: number;
  about: string;
}
