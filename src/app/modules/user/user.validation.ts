import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  role: z.enum(['admin', 'student', 'faculty']),
});

export const UserValidation = {
  userValidationSchema
};
