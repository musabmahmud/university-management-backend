import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidations.createAcademicFacultySchema),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.post(
  '/update/:facultyId',
  validateRequest(AcademicFacultyValidations.updateAcademicFacultySchema),
  AcademicFacultyControllers.updateAcademicFaculty
);

router.delete(
  '/delete/:facultyId',
  AcademicFacultyControllers.deleteAcademicFaculty
);

export const AcademicFacultyRoutes = router;
