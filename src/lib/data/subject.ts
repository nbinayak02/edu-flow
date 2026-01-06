import { Subject } from "@/app/(system)/subject/types";
import { prisma } from "../prisma";

export async function CreateNewSubject(subject: Subject) {
  const newSubject = await prisma.subject.create({
    relationLoadStrategy: "join",
    data: {
      name: subject.name,
      credit_hour: subject.credit_hour,
      sclassId: Number(subject.sclassId),
    },
    include: {
      sclass: true,
    },
  });
  return newSubject;
}

export async function GetAllSubjects(schoolId: number) {
  const allSubjects = await prisma.subject.findMany({
    relationLoadStrategy: "join",
    include: {
      sclass: true,
    },
    where: {
      sclass: {
        schoolId: schoolId,
      },
    },
  });
  return allSubjects;
}

export async function GetSubjectsByClass(classId: number) {
  const subjects = await prisma.subject.findMany({
    where: {
      sclassId: classId,
    },
  });

  return subjects;
}

export async function GetSubjectNamesByClass(classId: number) {
  const subjectNames = await prisma.subject.findMany({
    where: {
      sclassId: classId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (subjectNames.length > 0) {
    return subjectNames;
  } else {
    throw new Error("No subject found.", { cause: 404 });
  }
}

export async function GetNumberOfSubjectsByClass(classId: number) {
  const subjectCount = await prisma.subject.aggregate({
    _count: {
      id: true,
    },
    where: {
      sclassId: classId,
    },
  });

  return subjectCount._count.id;
}

export async function GetAllSubjectCreditHourByClass(classId: number) {
  const creditHour = await prisma.subject.findMany({
    where: {
      sclassId: classId,
    },
    select: {
      id: true,
      credit_hour: true,
    },
  });
  return creditHour;
}
