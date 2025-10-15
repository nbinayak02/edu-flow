import { Student } from "@/app/(system)/student/types";
import { prisma } from "../prisma";

export async function AddStudent(studentData: Student) {
  const newStudent = await prisma.student.create({
    relationLoadStrategy: "join",
    data: {
      name: studentData.name,
      address: studentData.address,
      contact: studentData.contact,
      gurdian: studentData.gurdian,
      year: studentData.year,
      iemis: studentData.iemis,
      sclassId: Number(studentData.sclassId),
    },
    include: {
      sclass: true,
    },
  });

  return newStudent;
}

export async function GetNewStudents(schoolId: number) {
  const newStudents = await prisma.student.findMany({
    relationLoadStrategy: "join",
    include: {
      sclass: true,
    },
    where: {
      sclass: {
        schoolId: schoolId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20, //select latest 20 students
  });
  return newStudents;
}
