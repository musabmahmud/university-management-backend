import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
  isActive?: boolean;
  isDeleted?: boolean;
};
