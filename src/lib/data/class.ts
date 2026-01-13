import { createPayload } from "@/app/(system)/class/types";
import prisma from "../prisma";
import { Sclass } from "@prisma/client";

export function CreateNewClass(clss: createPayload) {
  return prisma.sclass.create({
    data: {
      name: clss.name,
      schoolId: clss.schoolId,
      section: clss.section,
    },
  });
}

export async function getAllClasses(schoolId: number) {
  const allClasses = await prisma.sclass.findMany({
    where: {
      schoolId: schoolId,
    },
  });
  return allClasses;
}

export async function EditClass(classId: number) {}

export async function DeleteClass(classId: number) {
  await prisma.sclass.delete({
    where: {
      id: classId,
    },
  });
}

export async function getClass(sclassId: number) {
  const sclass = await prisma.sclass.findFirst({
    where: {
      id: sclassId,
    },
  });
  return sclass;
}

export function findClassByNameAndSection(
  data: Omit<Sclass, "id" | "schoolId" | "createdAt">
) {
  return prisma.sclass.findFirst({
    where: {
      name: data.name,
      section: data.section,
    },
  });
}
