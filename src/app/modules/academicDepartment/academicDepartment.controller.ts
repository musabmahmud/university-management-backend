import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentFromDB(req.body);

  sendResponse(res, {
    message: 'Academic Department Created Successfully!',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (_req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    message: 'Academic Department Fetched Successfully!',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    message: 'Single Academic Department Fetched Successfully!',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      departmentId,
      req.body,
    );

  sendResponse(res, {
    message: 'Acadmeic Department Updated Successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
