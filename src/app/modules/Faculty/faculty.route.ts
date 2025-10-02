import express from 'express';
import { FacultyServices } from './faculty.service';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';


const router = express.Router();

router.get('/', FacultyControllers.getAllFacultys);
router.get('/:adminId', FacultyControllers.getSingleFaculty);
router.delete('/:adminId', FacultyControllers.deleteFaculty);

router.patch(
    '/update-faculty/:adminId',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

export const FacultyRoutes = router;
