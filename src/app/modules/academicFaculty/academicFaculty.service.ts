import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyFromDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find({ isDeleted: false });
  return result;
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};

const updateAcademicFacultyFromDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    payload,
    { new: true },
  );
  return result;
};

const deleteAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyFromDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
  deleteAcademicFacultyFromDB,
};
