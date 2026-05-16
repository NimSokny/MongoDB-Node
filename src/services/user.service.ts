import { CreateUserInput, UpdateUserInput } from '../models/userModel';
import { IUser } from '../interfaces/IUser';
import UserRepository from '../repositories/user.repository';

class UserService {
  private repo: UserRepository;

  constructor() {
    this.repo = new UserRepository();
  }

  public getAllUsers(): Promise<IUser[]> {
    return this.repo.findAll();
  }

  public getUserById(id: number): Promise<IUser | null> {
    return this.repo.findById(id);
  }

  public createUser(input: CreateUserInput): Promise<IUser> {
    return this.repo.create(input);
  }

  public updateUser(id: number, input: UpdateUserInput): Promise<IUser | null> {
    return this.repo.update(id, input);
  }

  public deleteUser(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}

export default UserService;

