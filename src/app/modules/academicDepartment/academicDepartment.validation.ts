import z, { string } from 'zod';

const createAcademicDepartmentSchema = z.object({
  body: z.object({
    name: string(),
    academicFaculty: string(),
  }),
});

const updateAcademicDepartmentSchema = z.object({
  body: z.object({
    name: string().optional(),
    academicFaculty: string().optional(),
  }),
});

export const AcademicDepartmentValiations = {
  createAcademicDepartmentSchema,
  updateAcademicDepartmentSchema,
};
