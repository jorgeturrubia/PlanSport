export interface IUser {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  DIRECTOR = 'director',
  ENTRENADOR = 'entrenador'
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
}
