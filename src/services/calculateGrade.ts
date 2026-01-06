import { Marks } from "@/app/(system)/marks/types";
import { GetAllSubjectsThAndPrFullMarks } from "@/lib/data/exam";
import {
  calculateFinalGrade,
  calculateGPA,
  calculatePercentage,
} from "./gradeCalculationHelpers";

import { GetAllSubjectCreditHourByClass } from "@/lib/data/subject";
import { UpdateGPAInMarksheet } from "@/lib/data/marks";

export async function calculateGrades(
  marks: Marks[],
  studentId: number,
  sclassId: number,
  examId: number,
  marksheetId: number
) {
  try {
    const allSubjectsBothFullMarks = await GetAllSubjectsThAndPrFullMarks(
      examId,
      sclassId
    );

    const obtainedMarksInPercent = calculatePercentage(
      marks,
      allSubjectsBothFullMarks
    );

    // all subjects grades
    const allSubjectFinalGrades = calculateFinalGrade(obtainedMarksInPercent);

    // find credit hour
    const creditHour = await GetAllSubjectCreditHourByClass(sclassId);

    // calculate final gpa
    const { gpa, totalCrh } = calculateGPA(creditHour, allSubjectFinalGrades);

    // update marks to store individual subjects grade letter, grade points

    //marksheetid, {subjectId:1, thGradeLetter, prGradeLetter, finalGradePoint}

    // update marksheet
    await UpdateGPAInMarksheet(marksheetId, gpa);
  } catch (error) {
    console.log(error);
  }
}
