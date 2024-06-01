import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/adminSchema.js";
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import Student from '../models/studentSchema.js';

dotenv.config(); 

export const loginUser = asyncHandler(async (req, res) => {
  const { userName, password, role } = req.body;

  let user, validPassword, token, secretKey;

  if (role === "admin") {
    user = await Admin.findOne({ userName });
    secretKey = process.env.ACCESS_TOKEN_SECRET;
  } else if (role === "student") {
    user = await Student.findOne({ userName });
    secretKey = process.env.ACCESS_STUDENT_KEY;
  } else {
    return res.status(400).json({ message: "Invalid role specified!" });
  }

  if (!user) {
    return res.status(401).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not registered!` });
  }

  validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Wrong Password" });
  }

  token = jwt.sign(
    {
      user: {
        userName: user.userName,
        role: user.role,
      },
    },
    secretKey,
    { expiresIn: "100m" }
  );

  console.log(`Generated token for ${role}:`, token);

  res.cookie("token", token, { httpOnly: true, secure: false }); // Set secure to false for local testing
  return res.json({ login: true, role });
});



export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ message: "Invalid token" });
    }

    req.userName = decoded.userName;
    req.role = decoded.role;
    next();
  });
};


export const logoutUser = (req, res) => {
  res.clearCookie('token');
  return res.json({ logout: true });
};

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ login: false, message: "No token provided" });
  }

  console.log('Verifying token:', token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      jwt.verify(token, process.env.ACCESS_STUDENT_KEY, (err, decoded) => {
        if (err) {
          return res.json({ login: false, message: "Invalid token" });
        }

        console.log('Decoded student token:', decoded);

        req.userName = decoded.user.userName;
        req.role = decoded.user.role;
        next();
      });
    } else {
      console.log('Decoded admin token:', decoded);

      req.userName = decoded.user.userName;
      req.role = decoded.user.role;
      next();
    }
  });
};

export const verify = (req, res) => {
  if (!req.role) {
    return res.json({ login: false, message: "Role not found" });
  }
  return res.json({ login: true, role: req.role });
};
