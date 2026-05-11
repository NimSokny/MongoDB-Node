import { Request, Response } from 'express';
import BaseController from './baseController';
import UserService from '../services/userService';

class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      this.sendSuccess(res, users);
    } catch (error) {
      this.sendError(res, (error as Error).message);
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        this.sendError(res, 'User not found', 404);
        return;
      }
      this.sendSuccess(res, user);
    } catch (error) {
      this.sendError(res, (error as Error).message);
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      this.sendSuccess(res, user, 'User created', 201);
    } catch (error) {
      this.sendError(res, (error as Error).message, 400);
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        this.sendError(res, 'User not found', 404);
        return;
      }
      this.sendSuccess(res, user, 'User updated');
    } catch (error) {
      this.sendError(res, (error as Error).message, 400);
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        this.sendError(res, 'User not found', 404);
        return;
      }
      this.sendSuccess(res, null, 'User deleted');
    } catch (error) {
      this.sendError(res, (error as Error).message);
    }
  };
}

export default UserController;
