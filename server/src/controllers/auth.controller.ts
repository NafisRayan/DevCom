import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { generateToken } from '../middleware/auth';
import { AppError } from '../middleware/error';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return next(new AppError('User already exists', 400));
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      specialization: [],
      portfolio: [],
      socialLinks: [],
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          specialization: user.specialization,
          portfolio: user.portfolio,
          socialLinks: user.socialLinks,
        },
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          specialization: user.specialization,
          portfolio: user.portfolio,
          socialLinks: user.socialLinks,
        },
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, specialization, portfolio, socialLinks } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (name) user.name = name;
    if (specialization) user.specialization = specialization;
    if (portfolio) user.portfolio = portfolio;
    if (socialLinks) user.socialLinks = socialLinks;

    await user.save();

    res.json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          specialization: user.specialization,
          portfolio: user.portfolio,
          socialLinks: user.socialLinks,
        },
      },
    });
  } catch (error: any) {
    next(error);
  }
}; 