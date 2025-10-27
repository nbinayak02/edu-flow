import { ConfigureExamDbType, Exam } from "@/app/(system)/exam/types";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

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

export async function AddExamDetails(data: ConfigureExamDbType[]) {
  try {
    const addedExamDetails = await prisma.examDetails.createManyAndReturn({
      data,
    });
    let examDetails;
    if (addedExamDetails.length > 0) {
      examDetails = GetExamDetails(data[0].examId);
    }
    return examDetails;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return "The subject detail(s) already exists.";
    }
    return "An unknown error occured. Please try again later!";
  }
}

export async function GetExamDetails(examId: number) {
  const examDetails = await prisma.examDetails.findMany({
    relationLoadStrategy: "join",
    where: {
      examId: examId,
    },
    include: {
      sclass: true,
      subject: true,
    },
  });
  return examDetails;
}
