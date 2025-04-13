import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models';
import { AppError } from './error';

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('Please authenticate', 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findOne({ _id: (decoded as any)._id }).select('+password');

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Please authenticate', 401));
    }
  }
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ _id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}; 