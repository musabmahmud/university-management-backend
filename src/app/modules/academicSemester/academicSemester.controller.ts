import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterFromDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is Created Succssfully',
    data: result
  });
});

const getAllAcademicSemester = catchAsync(async (_req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester',
    data: result
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  if (!semesterId && typeof semesterId !== 'string') {
    throw new Error('Please Provide valid type of ID');
  }
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
    semesterId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `${result?.name} Fetched Successfully!`,
    success: true,
    data: result
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  if (!semesterId && typeof semesterId !== 'string') {
    throw new Error('Please Provide valid type of ID');
  }

  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    semesterId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `${result?.name} Updated Successfully!`,
    success: true,
    data: result
  });
});



export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester
};
