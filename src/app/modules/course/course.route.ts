import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router()

router.post('/create-course', validateRequest(CourseValidations.createCourseVaidationSchema), CourseControllers.createCourse)

router.get('/', CourseControllers.getAllCourses)

router.get('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)

router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)

router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse)


export const CourseRoute = router