import { Request, Response } from 'express';
import walletService from '../services/walletService';

export const fundAccount = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  try {
    const transaction = await walletService.fundAccount(userId, amount);
    res.status(200).json(transaction);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'error funding';
    res.status(404).json({ error: errorMessage });
  }
};

export const transferFunds = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, amount } = req.body;
  try {
    const transaction = await walletService.transferFunds(fromUserId, toUserId, amount);
    res.status(200).json(transaction);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'transfer error';
    res.status(404).json({ error: errorMessage });
  }
};

export const withdrawFunds = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  try {
    const transaction = await walletService.withdrawFunds(userId, amount);
    res.status(200).json(transaction);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'withdrawal error';
    res.status(404).json({ error: errorMessage });
  }
};

export default { fundAccount, transferFunds, withdrawFunds };
