import z from 'zod';

const createAcademicFacultySchema = z.object({
  body: z.object({
    name: z.string()
  })
});

const updateAcademicFacultySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    isActive: z.boolean().optional(),
    isDeleted: z.boolean().optional()
  })
});

export const AcademicFacultyValidations = {
  createAcademicFacultySchema,
  updateAcademicFacultySchema
};
