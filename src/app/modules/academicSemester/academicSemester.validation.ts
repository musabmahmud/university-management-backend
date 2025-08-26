import z from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterName
} from './academicSemester.constant';

const createAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonths: z.enum([...academicSemesterMonths] as [string, ...string[]]),
    endMonths: z.enum([...academicSemesterMonths] as [string, ...string[]])
  })
});

const updateAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonths: z
      .enum([...academicSemesterMonths] as [string, ...string[]])
      .optional(),
    endMonths: z
      .enum([...academicSemesterMonths] as [string, ...string[]])
      .optional()
  })
});

export const AcademicSemesterValidations = {
  createAcademicSemesterSchema,
  updateAcademicSemesterSchema
};
