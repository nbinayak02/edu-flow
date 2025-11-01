import { Marks, Marksheet } from "@/app/(system)/marks/types";
import { prisma } from "../prisma";

export async function CreateMarksheet(data: Marksheet) {
  const msheet = await prisma.marksheet.create({
    data: {
      studentId: data.studentId,
      sclassId: data.sclassId,
      examId: data.examId,
      total: data.total,
      gradeLetter: data.gradeLetter,
      gpa: data.gpa,
      remarks: data.remarks,
    },
  });
  return msheet;
}

export async function AddStudentMarks(data: Marks[]) {
  const mrks = await prisma.marks.createMany({
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
