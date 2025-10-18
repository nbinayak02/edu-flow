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
