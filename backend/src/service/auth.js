import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

/**
 * @param {string} email
 * @param {string} password
 * @returns {object} { user, token }
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new AppError('Invalid credentials', 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError('Server config error', 500);
  }

  const token = jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d', issuer: 'myapi', audience: 'users' }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

/**
 * @param {object} userData - Datos del nuevo usuario
 * @returns {object} El usuario creado
 */
export const registerNewUser = async ({ name, email, password, role }) => {
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
  return user;
};
