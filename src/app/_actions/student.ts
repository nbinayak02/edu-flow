"use server";
import {
  AddStudentAndEnroll,
  GetNewStudents,
  GetStudentNamesByClassAndYear,
} from "@/lib/data/student";
import { Student, FormState, StudentError } from "../(system)/student/types";
import {
  FetchedDataType,
  StudentSearchError,
  StudentSearchFormState,
} from "../(system)/marks/types";
import { GetSubjectNamesByClass, GetSubjectsByClass } from "@/lib/data/subject";
import { revalidatePath } from "next/cache";

export async function AddStudentAction(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  // console.log("Form data: ", formData);

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const contact = formData.get("contact") as string;
  const gurdian = formData.get("gurdian") as string;
  const academicYear = Number(formData.get("year"));
  const iemis = formData.get("iemis") as string;
  const sclassId = Number(formData.get("sclass"));

  const errors: StudentError = {};

  if (!sclassId) errors.sclass = "Please select class.";
  if (!name) errors.name = "Name is required";
  if (!address) errors.address = "Address is required";
  if (!contact) errors.contact = "Contact is required";
  if (!academicYear) errors.year = "Year is required";
  if (!iemis) errors.iemis = "IEMIS is required";

  if (Object.keys(errors).length > 0) return { errors, success: false };

  try {
    const studentData: Student = {
      name,
      address,
      contact,
      gurdian,
      iemis,
    };

    await AddStudentAndEnroll(studentData, sclassId, academicYear);
    revalidatePath("/student");
    return { success: true };
  } catch (error) {
    console.log("Error in AddStudentAction: ", error);
    return { success: false };
  }
}

export async function SearchStudentsAction(
  prevState: StudentSearchFormState,
  formData: FormData
): Promise<StudentSearchFormState> {
  const sclassId = Number(formData.get("classId"));
  const examYear = Number(formData.get("year"));

  const errors: StudentSearchError = {};

  if (!sclassId) errors.class = "Please select a class.";
  if (!examYear) errors.year = "Please select a year.";

  if (Object.entries(errors).length > 0) {
    return { errors, data: { students: [], subjects: [] } };
  }

  try {
    //get data from db
    const promise1 = GetStudentNamesByClassAndYear(sclassId, examYear);
    const promise2 = GetSubjectNamesByClass(sclassId);

    //wait for data
    const [students, subjects] = await Promise.all([promise1, promise2]);

    return { errors: {}, data: { students: students, subjects: subjects } };
  } catch (error) {
    if (error instanceof Error && error.cause === 404) {
      errors.otherErrors = error.message;
    }
    console.log("Error in SearchStudentAction: ", error);
    return { errors, data: { students: [], subjects: [] } };
  }
}

export async function GetStudentsBySchoolId(schoolId: number) {
  try {
    const students = await GetNewStudents(schoolId);
    return students;
  } catch (error) {
    console.log("Error on GetStudentsBySchoolId: ", error);
    return [];
  }
}
