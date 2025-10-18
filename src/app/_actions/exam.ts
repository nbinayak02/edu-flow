"use server";

import { getSchoolId } from "@/lib/auth";
import { Error, Exam, FormState } from "../(system)/exam/types";
import { CreateExam } from "@/lib/data/exam";

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
