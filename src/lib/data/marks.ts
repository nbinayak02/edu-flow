import { Marks, Marksheet } from "@/app/(system)/marks/types";
import { prisma } from "../prisma";

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

export async function UpdateGPAInMarksheet(marksheetId: number, gpa: number) {
  const updatedMarksheet = await prisma.marksheet.update({
    where: {
      id: marksheetId,
    },
    data: {
      gpa: gpa,
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
