import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // const academicSemester = await AcademicSemester.findOne(
  //   studentData.academicSemester
  // );

  const academicSemesterData = await AcademicSemester.findById(
    studentData.academicSemester
  );

  const session = await mongoose.startSession();

  if (!academicSemesterData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to generate ID');
  }

  try {
    session.startTransaction();

    const studentId = await generateStudentId(academicSemesterData);

    userData.id = studentId.toString() || '00000000001';

    const newUser = await User.create([userData], { session });
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!');
    }
    // set id , _id as user
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student!');
    }

    await session.commitTransaction();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    throw new Error('Failed to create Student!');
  } finally {
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB
};
