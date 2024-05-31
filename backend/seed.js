import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from './models/adminSchema.js';
import connectDB from './config/dbconfig.js';
import dotenv from 'dotenv';

dotenv.config(); 

// Connect to the database
connectDB();

// Function to create an admin account
async function createAdminAccount() {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashPassword = await bcrypt.hash('admin@123!', 10);
            const newAdmin = new Admin({
                userName: 'admin', 
                password: hashPassword,
                role: 'admin'  
            });
            await newAdmin.save();
            console.log("Admin account created!");
        } else {
            console.log("Admin account already exists!");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close(); 
    }
}

createAdminAccount();
