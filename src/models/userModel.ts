import { IUser } from '../interfaces/IUser';

export type CreateUserInput = Pick<IUser, 'name' | 'email' | 'password'>;
export type UpdateUserInput = Partial<Pick<IUser, 'name' | 'email' | 'password'>>;

