import { createPayload } from "@/app/(system)/subject/types";
import prisma from "../prisma";
import { Prisma, SubjectAssigned } from "@prisma/client";
import { CreditHourType } from "../types";

export function createNewSubject(payload: createPayload) {
  return prisma.subject.create({
    data: {
      name: payload.name,
      schoolId: payload.schoolId,
    },
  });
}

export function getAllSubjects(schoolId: number) {
  return prisma.subject.findMany({
    where: {
      schoolId: schoolId,
    },
  });
}

export function getSubjectsByClass(classId: number) {
  return prisma.subjectAssigned.findMany({
    where: {
      sclassId: classId,
    },
    select: {
      credit_hour: true,
      sclassId: true,
      subject: true,
    },
  });
}

export async function GetSubjectNamesByClass(classId: number) {
  const subjectNames = await prisma.subjectAssigned.findMany({
    where: {
      sclassId: classId,
    },
    select: {
      subject: true,
    },
  });

  if (subjectNames.length > 0) {
    return subjectNames;
  } else {
    throw new Error(
      "Subjects not found for the given class. Please make sure that subjects have been setup in this class, as it is required for this operation.",
      { cause: 404 }
    );
  }
}

export async function GetNumberOfSubjectsByClass(classId: number) {
  const subjectCount = await prisma.subjectAssigned.aggregate({
    where: {
      sclassId: classId,
    },
    _count: {
      subjectId: true,
    },
  });

  return subjectCount._count.subjectId;
}

export async function GetAllSubjectCreditHourByClass(classId: number) {
  const creditHour = await prisma.subjectAssigned.findMany({
    where: {
      sclassId: classId,
    },
    select: {
      subject: true,
      credit_hour: true,
    },
  });

  const payload:CreditHourType[] = creditHour.map((chr) => {
    return {
      id:chr.subject.id,
      credit_hour: chr.credit_hour,
    }
  })

  return payload;
}

export function assignSubject(data: SubjectAssigned[]) {
  return prisma.subjectAssigned.createMany({
    data,
  });
}

export function getAllSubjectsWithClassAssigned(schoolId: number) {
  return prisma.subject.findMany({
    where: {
      schoolId,
    },
    include: {
      subjectAssigned: {
        select: {
          sclassId: true,
          credit_hour: true,
          sclass: true,
          subjectId: true,
        },
      },
    },
  });
}
