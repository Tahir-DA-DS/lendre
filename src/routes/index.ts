import { Router } from 'express';
import userController from '../controllers/userController';
import walletController from '../controllers/walletController';

const router = Router();

// User routes
router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUser);

// Wallet routes
router.post('/wallets/fund', walletController.fundAccount);
router.post('/wallets/transfer', walletController.transferFunds);
router.post('/wallets/withdraw', walletController.withdrawFunds);

export default router;
