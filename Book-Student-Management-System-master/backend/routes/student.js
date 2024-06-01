import express from 'express';
import { studentController } from '../controllers/studentController.js';
import {verifyAdmin} from '../controllers/loginController.js'

const router = express.Router();

router.post('/register', verifyAdmin, studentController);

export default router;
