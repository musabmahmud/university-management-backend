import z from 'zod';
import { UserValidation } from '../user/user.validation';
import { BloodGroup, Gender } from '../user/user.constant';

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Password can not be more than 20 characters' }),
    admin: z.object({
      designation: z.string(),
      name: UserValidation.createUserNameValidationSchema,
      gender: z.enum(Gender as [string, ...string[]]),
      dateOfBirth: z.string(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(BloodGroup as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
      isActive: z.boolean().default(true),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
    admin: z.object({
      designation: z.string().optional(),
      name: UserValidation.createUserNameValidationSchema.optional(),
      gender: z.enum(Gender as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(BloodGroup as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      isActive: z.boolean().default(true).optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});
