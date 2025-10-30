"use server";

import { getSchoolId } from "@/lib/auth";
import {
  AddExamReturnType,
  ConfigureExamDbType,
  ConfigureExamError,
  ConfigureExamFormState,
  Error,
  Exam,
  FormState,
} from "../(system)/exam/types";
import {
  AddExamDetails,
  CreateExam,
  GetExamByYear,
  GetExamDetails,
} from "@/lib/data/exam";

export async function CreateExamAction(
  prevState: FormState,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const year = Number(formData.get("year"));

  const errors: Error = {};

  if (!name) errors.name = "Name is required";
  if (!year) errors.year = "Year is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const schoolId = Number(await getSchoolId());
  const examData: Exam = {
    name,
    year,
    schoolId,
  };
  const createdExam = await CreateExam(examData);
  return { createdExam };
}

export async function AddExamDetailsAction(
  prevState: ConfigureExamFormState,
  formData: FormData
): Promise<ConfigureExamFormState> {
  console.log("Form data: ", formData);
  const classId = Number(formData.get("classId"));
  const subjects = formData.get("subjects")?.toString().split(",") ?? [];
  const thfm = Number(formData.get("thfm"));
  const thpm = Number(formData.get("thpm"));
  const prfm = Number(formData.get("prfm"));
  const prpm = Number(formData.get("prpm"));
  const examId = Number(formData.get("examId"));

  //validation
  const errors: ConfigureExamError = {};

  if (!classId) errors.classId = "Please select a class.";
  if (!subjects) errors.subjects = "Please select at least one subject.";
  // if (!thfm) errors.thFm = "Theory full marks cannot be empty.";
  // if (!thpm) errors.thPm = "Theory pass marks cannot be empty.";
  // if (!prfm) errors.prFm = "Practical full marks cannot be empty.";
  // if (!prpm) errors.prPm = "Practical full marks cannot be empty.";
  if (isNaN(thfm)) errors.thFm = "Theory full marks should be number.";

  if (Object.keys(errors).length > 0) {
    return { errors: errors, data: [] };
  }

  //making array of objects for createMany

  let data: ConfigureExamDbType[] = [];

  subjects.forEach((s) =>
    data.push({
      examId: examId,
      sclassId: classId,
      subjectId: Number(s),
      thFullMarks: thfm,
      thPassMarks: thpm,
      prFullMarks: prfm,
      prPassMarks: prpm,
    })
  );

  const returnedValue = await AddExamDetails(data);

  if (returnedValue) {
    if (typeof returnedValue === "string") {
      return { errors: { otherError: returnedValue }, data: [] };
    }

    return { errors: {}, data: returnedValue };
  }
  return { errors: errors, data: [] };
}

export async function GetExamDetailsAction(examId: number) {
  const details = await GetExamDetails(Number(examId));
  return details;
}

export async function GetExamByYearAction(year: number) {
  const exams = await GetExamByYear(year);
  return exams;
}
