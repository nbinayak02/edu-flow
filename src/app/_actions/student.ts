"use server";
import { AddStudent, GetStudentNamesByClassAndYear } from "@/lib/data/student";
import { Student, FormState, StudentError } from "../(system)/student/types";
import {
  FetchedDataType,
  StudentSearchError,
  StudentSearchFormState,
} from "../(system)/marks/types";
import { GetSubjectNamesByClass, GetSubjectsByClass } from "@/lib/data/subject";

export async function AddStudentAction(
  prevState: FormState,
  formData: FormData
) {
  console.log("Form data: ", formData);

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const contact = formData.get("contact") as string;
  const gurdian = formData.get("gurdian") as string;
  const year = Number(formData.get("year"));
  const iemis = formData.get("iemis") as string;
  const sclassId = Number(formData.get("sclass"));

  const errors: StudentError = {};

  if (!sclassId) errors.sclass = "Please select class.";
  if (!name) errors.name = "Name is required";
  if (!address) errors.address = "Address is required";
  if (!contact) errors.contact = "Contact is required";
  if (!year) errors.year = "Year is required";
  if (!iemis) errors.iemis = "IEMIS is required";

  if (Object.keys(errors).length > 0) return { errors };

  const studentData: Student = {
    name,
    address,
    contact,
    gurdian,
    year,
    iemis,
    sclassId,
  };

  const newStudent = await AddStudent(studentData);

  return { newStudent };
}

export async function SearchStudentsAction(
  prevState: StudentSearchFormState,
  formData: FormData
): Promise<StudentSearchFormState> {
  const sclassId = Number(formData.get("classId"));
  const examYear = Number(formData.get("year"));

  const errors: StudentSearchError = {};

  //return payload
  const data: FetchedDataType = {
    students: [],
    subjects: [],
  };

  if (!sclassId) errors.class = "Please select a class.";
  if (!examYear) errors.year = "Please select a year.";

  if (Object.entries(errors).length > 0) {
    return { errors, data };
  }

  //get data from db
  const promise1 = GetStudentNamesByClassAndYear(sclassId, examYear);
  const promise2 = GetSubjectNamesByClass(sclassId);

  //wait for data
  await Promise.all([promise1, promise2])
    .then((values) => {
      data.students = [...values[0]];
      data.subjects = [...values[1]];
    })
    .catch((error) => {
      if (error instanceof Error && error.cause === 404) {
        errors.otherErrors = error.message;
      }
    });

  return { errors, data };
}
