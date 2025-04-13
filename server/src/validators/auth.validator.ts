import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
  })
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
    email: z.string().email('Invalid email format').optional(),
    currentPassword: z.string().min(6, 'Current password must be at least 6 characters long').optional(),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long').optional(),
    confirmNewPassword: z.string().optional()
  }).refine((data) => {
    if (data.newPassword) {
      return data.newPassword === data.confirmNewPassword;
    }
    return true;
  }, {
    message: "New passwords don't match",
    path: ["confirmNewPassword"]
  }).refine((data) => {
    if (data.newPassword) {
      return !!data.currentPassword;
    }
    return true;
  }, {
    message: "Current password is required to set new password",
    path: ["currentPassword"]
  })
}); 