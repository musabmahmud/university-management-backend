import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
    });
})

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses are retrieved succesfully',
        data: result,
    });
})

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.body
    const result = await CourseServices.getSingleCourseFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses is retrieved succesfully',
        data: result,
    });
})

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.body
    const result = await CourseServices.updateCourseIntoDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses is updated succesfully',
        data: result,
    });
})

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.body
    const result = await CourseServices.deleteCourseFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses is deleted succesfully',
        data: result,
    });
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { CourseId } = req.body
    const { faculties } = req.body

    const result = await CourseServices.assignFacultiesWithCourseIntoDB(CourseId, faculties)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties assigned  succesfully',
        data: result,
    });
})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { CourseId } = req.body
    const { faculties } = req.body

    const result = await CourseServices.
        removeFacultiesFromCourseFromDB(CourseId, faculties)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties removed succesfully',
        data: result,
    });
})

export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse,
};