import mongoose from "mongoose";
import httpStatus from 'http-status';
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constants";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../error/AppError";



const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find(), query)
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.modelQuery;
    return result
}


const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session
        })

        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id,
                {
                    $pull: {
                        preRequisiteCourses: { course: { $in: deletedPreRequisites } }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update (pre) courses')
            }

            const newPreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)

            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id, {
                $addToSet: {
                    preRequisiteCourses: { $each: newPreRequisites }
                }
            },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!newPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update (new pre) courses')
            }
        }

        await session.commitTransaction();
        await session.endSession()
    } catch (err) {
        console.log(err)
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
    }
}

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true
    })
    return result
}

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id, {
        course: id,
        $addToSet: { faculties: { $each: payload } }
    }, {
        upsert: true,
        new: true
    }
    )
    return result
}

const removeFacultiesFromCourseFromDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id, {
        $pull: { faculties: { $in: payload } }
    },
        { new: true }
    )
    return result
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB,
};