import { Exam } from "@/app/(system)/exam/types";
import { prisma } from "../prisma";

export async function GetAllExams(schoolId: number) {
  const exams = await prisma.exam.findMany({
    where: {
      schoolId: schoolId,
    },
    take: 9,
  });
  return exams;
}

export async function CreateExam(examData: Exam) {
  const createdExam = await prisma.exam.create({
    data: {
      name: examData.name,
      year: examData.year,
      schoolId: examData.schoolId,
    },
  });

  return createdExam;
}
