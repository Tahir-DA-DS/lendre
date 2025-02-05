import { Router } from 'express';
import { createUser, getUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/:userId', getUser);

export default router;
