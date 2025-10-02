import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

router.patch(
  '/update-student/:studentId',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
