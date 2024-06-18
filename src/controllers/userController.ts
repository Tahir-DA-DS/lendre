import { Request, Response } from 'express';
import userService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, initialBalance } = req.body;
  try {
    const user = await userService.createUser(name, email, initialBalance);
    res.status(201).json(user);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'error creating user';
    res.status(404).json({ error: errorMessage });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    const user = await userService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(404).json({ error: errorMessage });
  }
};

export default { createUser, getUser };
