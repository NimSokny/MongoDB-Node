import User, { IUser } from '../models/userModel';

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  public async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  public async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default UserService;
