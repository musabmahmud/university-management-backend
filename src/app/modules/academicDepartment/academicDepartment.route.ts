import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValiations } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicDepartmentValiations.createAcademicDepartmentSchema),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  '/update/:departmentId',
  validateRequest(AcademicDepartmentValiations.updateAcademicDepartmentSchema),
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
