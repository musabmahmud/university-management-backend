import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  role: z.enum(['admin', 'student', 'faculty']),
});

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const UserValidation = {
  userValidationSchema,
  createUserNameValidationSchema,
};
