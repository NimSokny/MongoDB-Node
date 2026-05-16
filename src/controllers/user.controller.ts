import { Request, Response } from 'express';
import BaseController from './BaseController';
import UserService from '../services/user.service';
import { CreateUserInput, UpdateUserInput } from '../models/userModel';

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
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        this.sendError(res, 'Invalid user id', 400);
        return;
      }

      const user = await this.userService.getUserById(id);
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
      const input: CreateUserInput = req.body;
      if (!input?.name || !input?.email || !input?.password) {
        this.sendError(res, 'name, email and password are required', 400);
        return;
      }

      const user = await this.userService.createUser(input);
      this.sendSuccess(res, user, 'User created', 201);
    } catch (error) {
      this.sendError(res, (error as Error).message, 400);
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        this.sendError(res, 'Invalid user id', 400);
        return;
      }

      const input: UpdateUserInput = req.body;
      const user = await this.userService.updateUser(id, input);
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
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        this.sendError(res, 'Invalid user id', 400);
        return;
      }

      const deleted = await this.userService.deleteUser(id);
      if (!deleted) {
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

