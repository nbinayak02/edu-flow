import { Marks, Marksheet } from "@/app/(system)/marks/types";
import  prisma  from "../prisma";

import { FinalGradeType } from "../types";

export async function CreateMarksheet(data: Marksheet) {
  const msheet = await prisma.marksheet.create({
    data: {
      studentId: data.studentId,
      sclassId: data.sclassId,
      examId: data.examId,
      gpa: 0,
      remarks: "",
    },
  });
  return msheet;
}

export async function AddStudentMarks(data: Marks[]) {
  const mrks = await prisma.marks.createManyAndReturn({
    data: data,
  });
  return mrks;
}

export async function GetMarksheet(studentId: number, examId: number) {
  const marksheet = await prisma.marksheet.findFirst({
    where: {
      studentId,
      examId,
    },
  });
  return marksheet;
}

export async function UpdateGPAInMarksheet(
  marksheetId: number,
  gpa: number,
  totalCrh: number
) {
  const updatedMarksheet = await prisma.marksheet.update({
    where: {
      id: marksheetId,
    },
    data: {
      gpa: gpa,
      totalCreditHour: totalCrh,
    },
  });

  return updatedMarksheet;
}

export async function GetAllMarksheeetByClassAndExam(
  sclassId: number,
  examId: number
) {
  const marksheets = await prisma.marksheet.findMany({
    where: {
      sclassId,
      examId,
    },
    include: {
      sclass: true,
      student: true,
      exam: true,
    },
  });
  return marksheets;
}

export async function UpdateGradesInMarks(
  marksheetId: number,
  updateMarksPayload: FinalGradeType[]
) {
  await prisma.$transaction(async (tx) => {
    // begin the transaction

    // update parallely
    await Promise.all(
      // return array of update promises
      updateMarksPayload.map((marks) => {
        return tx.marks.update({
          where: {
            marksId: {
              marksheetId: marksheetId,
              subjectId: marks.subjectId,
            },
          },
          data: {
            thGradeLetter: marks.thGradeLetter,
            prGradeLetter: marks.prGradeLetter,
            finalGrade: marks.finalGradeLetter,
            gradePoint: marks.finalGradePoint,
          },
        });
      })
    );
  });
}

export async function GetMarksByMarksheet(marksheetId: number) {
  const marks = await prisma.marks.findMany({
    where: {
      marksheetId,
    },
    include: {
      subject: true,
    },
  });
  return marks;
}
