import express from 'express';
import { bookController, getBooks, editBook, updateBook, deleteBook } from '../controllers/bookController.js';
import {verifyAdmin} from '../controllers/loginController.js'

const router = express.Router();

router.post('/add', verifyAdmin, bookController);
router.get('/books', getBooks);
router.get('/book/:id',editBook);
router.put('/book/:id',updateBook);
router.delete('/book/:id',deleteBook);

export default router;
