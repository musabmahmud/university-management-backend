import { Model, Types } from 'mongoose';
import { TBloodGroup, TGender, TUserName } from '../user/user.interface';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  academicDepartment: Types.ObjectId;
  name: TUserName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>;
}
