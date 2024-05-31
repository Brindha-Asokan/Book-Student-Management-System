import bcrypt from 'bcrypt';
import Student from '../models/studentSchema.js';
import asyncHandler from 'express-async-handler';

export const studentController = asyncHandler(async (req, res) => {
  try {
    const { userName, password, rollNo, grade } = req.body;

    const existingStudent = await Student.findOne({ userName });

    if (existingStudent) {
      return res.status(400).json({ message: 'Student is already registered' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      userName,
      password: hashPassword,
      rollNo,
      grade,
    });

    return res.json({ registered: true, student: newStudent });
  } catch (err) {
    return res.status(400).json({ message: 'Error in registering student' });
  }
});
