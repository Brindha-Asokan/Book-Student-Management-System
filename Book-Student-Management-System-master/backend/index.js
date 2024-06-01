import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';  
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'; 
import studentRoutes from './routes/student.js'; 
import bookRoutes from './routes/book.js'; 
import Book from './models/bookSchema.js';
import Admin from './models/adminSchema.js';
import Student from './models/studentSchema.js';

dotenv.config(); 

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(cookieParser());

// Routes setup
app.use('/auth', authRoutes);  
app.use('/student', studentRoutes); 
app.use('/book', bookRoutes);
app.get('/dashboard', async(req,res)=>
{
    try
    {
        const student = await Student.countDocuments();
        const admin = await Admin.countDocuments();
        const book = await Book.countDocuments();
        return res.json({ok:true, student, book, admin})
        console.log(res.data.student,res.data.admin,res.data.book)
    }
    catch(err)
    {
        return res.json(err)
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
