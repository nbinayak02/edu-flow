import { Class } from "@/app/(system)/class/types";
import  prisma  from "../prisma";

export async function CreateNewClass(schoolId: number, clss: Class) {
  const newClass = await prisma.sclass.create({
    data: {
      name: clss.name,
      schoolId: schoolId,
    },
  });
  return newClass;
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
