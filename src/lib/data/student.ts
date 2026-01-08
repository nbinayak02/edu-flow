import { Student } from "@/app/(system)/student/types";
import prisma from "../prisma";

export async function AddStudentAndEnroll(
  studentData: Student,
  sclassId: number,
  academicYear: number
) {
  await prisma.$transaction(async (tx) => {
    // add student
    const newStudent = await prisma.student.create({
      data: {
        name: studentData.name,
        address: studentData.address,
        contact: studentData.contact,
        gurdian: studentData.gurdian,
        iemis: studentData.iemis,
      },
    });

    // enroll
    await prisma.enrollment.create({
      data: {
        studentId: newStudent.id,
        sclassId: sclassId,
        academicYear: academicYear,
      },
    });
  });
}

export async function GetNewStudents(schoolId: number) {
  const newStudents = await prisma.student.findMany({
    relationLoadStrategy: "join",
    where: {
      enrollment: {
        some: {
          sclass: {
            schoolId: schoolId,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      address: true,
      contact: true,
      enrollment: {
        select: {
          sclass: {
            select: {
              name: true,
            },
          },
          academicYear: true,
        },
      },
      iemis: true,
      gurdian: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20, //select latest 20 students
  });
  return newStudents;
}

export async function GetStudentNamesByClassAndYear(
  sclassId: number,
  year: number
) {
  const students = await prisma.student.findMany({
    relationLoadStrategy: "join",
    where: {
      enrollment: {
        some: {
          sclassId,
          academicYear: year,
        },
      },
    },
    select: {
      id: true,
      name: true,
      enrollment: {
        select: {
          id: true,
        },
      },
    },
  });

  if (students.length > 0) {
    return students;
  } else {
    throw new Error(
      "Students not found for given class and year. Please make sure that students are enrolled in class for that year.",
      { cause: 404 }
    );
  }
}
