import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyFromDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is Created Succssfully',
    data: result
  });
});

const getAllAcademicFaculty = catchAsync(async (_req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Academic Faculty Fetched Successfully!`,
    data: result
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    facultyId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Found Successfully',
    data: result
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await academicFacultyServices.updateAcademicFacultyFromDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Academic Faculty : ${req.body.name} update Successfully`,
    data: result
  });
});

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    facultyId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Deleted Successfully',
    data: result
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty
};
