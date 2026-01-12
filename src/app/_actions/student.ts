"use server";
import {
  AddStudentAndEnroll,
  assignRollNumber,
  getAllStudentByClassAndYear,
  GetNewStudents,
} from "@/lib/data/student";
import {
  Student,
  FormState,
  StudentError,
  Enrollment,
} from "../(system)/student/types";
import {
  StudentSearchError,
  StudentSearchFormState,
} from "../(system)/marks/types";
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
      rollNumber: 0,
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
  _: unknown,
  formData: FormData
): Promise<StudentSearchFormState> {
  const sclassId = Number(formData.get("classId"));
  const academicYear = Number(formData.get("year"));

  const errors: StudentSearchError = {};

  if (!sclassId) errors.class = "Please select a class.";
  if (!academicYear) errors.year = "Please select a year.";

  if (Object.entries(errors).length > 0) {
    return { errors, success: false };
  }

  try {
    //get data from db
    const data = await getAllStudentByClassAndYear(sclassId, academicYear);
    return { data, success: true };
  } catch (error) {
    if (error instanceof Error && error.cause === 404) {
      return {
        errors: { otherErrors: error.message },
        success: true,
        data: [],
      };
    }
    console.log("Error in SearchStudentAction: ", error);
    return {
      errors: { otherErrors: "Something went wrong! Please try again later." },
      success: false,
    };
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

// define type
type StudentType = {
  id: number;
  name: string;
  address: string;
  contact: string;
  gurdian: string;
  iemis: string;
  rollNumber: number;
  enrollment: Enrollment[];
};

export async function AssignRollNumbers(
  sclassId: number | undefined,
  academicYear: number | undefined
) {
  // console.log("Assign roll number reached.");
  try {
    if (!sclassId || !academicYear) {
      return false;
    }

    // get all students
    const students = await getAllStudentByClassAndYear(sclassId, academicYear);

    // sort them alphabetically
    students.sort((stu1: StudentType, stu2: StudentType) =>
      stu1.name.localeCompare(stu2.name)
    );

    // console.log("Student sorted alphabetically: ", students);

    // make update payload - in sorted order
    const updatePayload = students.map((stu: StudentType, index) => ({
      studentId: stu.id,
      index,
    }));

    // console.log("Update payload is: ", updatePayload);
    // make db call
    await assignRollNumber(updatePayload);
    return true;
  } catch (error) {
    console.log("Error at AssignRollNumbers: ", error);
    return false;
  }
}
