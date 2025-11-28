import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAudit } from '../utils/createAudit.js';
import AppError from '../utils/AppError.js';

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      throw new AppError('Email and password required', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError('Invalid credentials', 401);

    if (!process.env.JWT_SECRET) {
      throw new AppError('Server config error', 500);
    }

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
        issuer: 'myapi',
        audience: 'users',
      }
    );

    await createAudit(req, user._id, 'LOGIN', `User ${user.email} logged in`);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;

    email = email?.trim().toLowerCase();
    name = name?.trim();

    if (!name || !email || !password) {
      throw new AppError('Name, email and password are required', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('Invalid email format', 400);
    }

    if (password.length < 6) {
      throw new AppError('Password too short (min 6 chars)', 400);
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw new AppError('Email already registered', 409);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    await createAudit(
      req,
      user._id,
      'REGISTER',
      `User ${user.email} registered`
    );

    return res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    next(err);
  }
};
