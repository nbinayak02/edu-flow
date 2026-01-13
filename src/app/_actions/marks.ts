"use server";

import {
  AddStudentMarks,
  CreateMarksheet,
  GetMarksByMarksheet,
  GetMarksheet,
  UpdateGradesInMarks,
} from "@/lib/data/marks";
import {
  Marks,
  MarksError,
  MarksFormState,
  Marksheet,
  UpdateGradeInMarksType,
} from "../(system)/marks/types";
import { GetNumberOfSubjectsByClass } from "@/lib/data/subject";
import { calculateGrades } from "@/services/calculateGrade";
import { FinalGradeType } from "@/lib/types";

export async function AddMarks(
  prevState: MarksFormState,
  formData: FormData
): Promise<MarksFormState> {
  const examId = Number(formData.get("examId"));
  const enrollmentId = Number(formData.get("enrollmentId"));
  const sclassId = Number(formData.get("sclassId"));
  const marksArray = JSON.parse(String(formData.get("marks")));

  //validation
  const errors: MarksError = {};

  if (!examId) errors.exam = "Please select the exam.";
  if (!enrollmentId) errors.student = "Please select the student.";

  //counting no. of subject
  const subjectCount = await GetNumberOfSubjectsByClass(sclassId);

  console.log("No. of subject: ", subjectCount);

  if (marksArray.length < subjectCount)
    errors.subjectError = "Please input all marks.";

  if (Object.entries(errors).length > 0) {
    return { errors, message: "Error" };
  }

  //stopping duplicate
  const existingMarksheet = await GetMarksheet(enrollmentId, examId);

  if (existingMarksheet) {
    errors.otherError =
      "Marksheet for this student for this exam already exist.";
    return { errors, message: "Error" };
  }

  try {
    //create marksheet
    const marksheet = await CreateMarksheet({
      examId,
      enrollmentId,
    });

    //store marksheet id in every marks
    marksArray.map((m: Marks) => (m.marksheetId = marksheet.id));

    //create marks
    const storedMarks = await AddStudentMarks(marksArray);

    //calculate grades
    calculateGrades(storedMarks, enrollmentId, sclassId, examId, marksheet.id);
  } catch (error) {
    console.error("Error: ", error);
  }

  return { errors, message: "Success" };
}

export async function UpdateGradesInMarksAction(
  marksheetId: number,
  updateMarksPayload: FinalGradeType[]
) {
  try {
    await UpdateGradesInMarks(marksheetId, updateMarksPayload);
    return true;
  } catch (error) {
    console.log("Error in UpdateGradesInMarks: ", error);
    return false;
  }
}

export async function GetMarks(marksheetId: number) {
  try {
    const marks = await GetMarksByMarksheet(marksheetId);
    const payload = marks.map((m) => {
      return {
        subjectName: m.subject.name,
        credit_hour: m.subject.subjectAssigned.find(
          (sa) => sa.subjectId === m.subjectId
        )?.credit_hour,
        thGradeLetter: m.thGradeLetter,
        prGradeLetter: m.prGradeLetter,
        finalGrade: m.finalGrade,
        gradePoint: m.gradePoint,
      };
    });
    return payload;
  } catch (error) {
    console.log("Error on GetMarks: ", error);
    return null;
  }
}
