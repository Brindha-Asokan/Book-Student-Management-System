import express from 'express';
import { loginUser, logoutUser, verifyUser, verify } from '../controllers/loginController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/verify', verifyUser, verify);

export default router;
