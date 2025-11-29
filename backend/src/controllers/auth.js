import { createAudit } from '../utils/createAudit.js';
import AppError from '../utils/AppError.js';
import { loginUser, registerNewUser } from '../service/auth.js';

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    if (!email || !password) {
      throw new AppError('Email and password required', 400);
    }

    const { token, user } = await loginUser(email, password);

    await createAudit({
      req,
      user: user.id,
      entity: 'User',
      action: 'LOGIN',
      description: `User ${user.email} logged in`,
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const user = await registerNewUser(req.body);

    await createAudit({
      req,
      user: user._id,
      entity: 'User',
      action: 'REGISTER',
      description: `User ${user.email} registered`,
    });

    return res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};
