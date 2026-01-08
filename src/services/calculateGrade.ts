import { Marks } from "@/app/(system)/marks/types";
import { GetAllSubjectsThAndPrFullMarks } from "@/lib/data/exam";
import {
  calculateFinalGrade,
  calculateGPA,
  calculatePercentage,
} from "./gradeCalculationHelpers";

import { GetAllSubjectCreditHourByClass } from "@/lib/data/subject";
import { UpdateGPAInMarksheet } from "@/lib/data/marks";
import { UpdateGradesInMarksAction } from "@/app/_actions/marks";

export async function calculateGrades(
  marks: Marks[],
  enrollmentId: number,
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

    console.log("Obtained Marks in percent: ", obtainedMarksInPercent);

    // all subjects grades
    const allSubjectFinalGrades = calculateFinalGrade(obtainedMarksInPercent);

    console.log("All Subject Final Grades: ", allSubjectFinalGrades);

    // find credit hour
    const creditHour = await GetAllSubjectCreditHourByClass(sclassId);

    // calculate final gpa
    const { gpa, totalCrh } = calculateGPA(creditHour, allSubjectFinalGrades);

    // update marks to store individual subjects grade letter, grade points
    await UpdateGradesInMarksAction(marksheetId, allSubjectFinalGrades);

    // update marksheet
    await UpdateGPAInMarksheet(marksheetId, gpa, totalCrh);
  } catch (error) {
    console.log(error);
  }
}
