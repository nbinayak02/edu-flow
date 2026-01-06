"use server";

import {
  AddStudentMarks,
  CreateMarksheet,
  GetMarksheet,
} from "@/lib/data/marks";
import {
  Marks,
  MarksError,
  MarksFormState,
  Marksheet,
} from "../(system)/marks/types";
import { GetNumberOfSubjectsByClass } from "@/lib/data/subject";
import { calculateGrades } from "@/services/calculateGrade";

export async function AddMarks(
  prevState: MarksFormState,
  formData: FormData
): Promise<MarksFormState> {
  const examId = Number(formData.get("examId"));
  const studentId = Number(formData.get("studentId"));
  const sclassId = Number(formData.get("sclassId"));
  const marksArray = JSON.parse(String(formData.get("marks")));

  //validation
  const errors: MarksError = {};

  if (!examId) errors.exam = "Please select the exam.";
  if (!studentId) errors.student = "Please select the student.";

  //counting no. of subject
  const subjectCount = await GetNumberOfSubjectsByClass(sclassId);

  if (marksArray.length < subjectCount)
    errors.subjectError = "Please input all marks.";

  if (Object.entries(errors).length > 0) {
    return { errors, message: "Error" };
  }

  //stopping duplicate
  const existingMarksheet = await GetMarksheet(studentId, examId);

  if (existingMarksheet) {
    errors.otherError =
      "Marksheet for this student for this exam already exist.";
    return { errors, message: "Error" };
  }

  try {
    //create marksheet
    const marksheet = await CreateMarksheet({
      examId,
      studentId,
      sclassId,
    });

    //store marksheet id in every marks
    marksArray.map((m: Marks) => (m.marksheetId = marksheet.id));

    //create marks
    const storedMarks = await AddStudentMarks(marksArray);

    //calculate grades
    calculateGrades(storedMarks, studentId, sclassId, examId, marksheet.id);
  } catch (error) {
    console.error("Error: ", error);
  }

  return { errors, message: "Success" };
}
