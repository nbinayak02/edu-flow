import { Marks, Marksheet } from "@/app/(system)/marks/types";
import prisma from "../prisma";

import { FinalGradeType } from "../types";

export async function CreateMarksheet(data: Marksheet) {
  const msheet = await prisma.marksheet.create({
    data: {
      enrollmentId: data.enrollmentId,
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

// TODO: make enrollment id to be used instead of student id

export async function GetMarksheet(enrollmentId: number, examId: number) {
  const marksheet = await prisma.marksheet.findFirst({
    where: {
      enrollmentId: enrollmentId,
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
      enrollment: {
        sclassId: sclassId,
      },
      examId,
    },
    include: {
      enrollment: {
        include: {
          student: true,
          sclass: true,
        },

      },
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
