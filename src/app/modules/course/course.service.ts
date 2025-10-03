import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constants";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";



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

