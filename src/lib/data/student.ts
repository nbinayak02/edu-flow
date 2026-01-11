import { Student } from "@/app/(system)/student/types";
import prisma from "../prisma";

export async function AddStudentAndEnroll(
  studentData: Student,
  sclassId: number,
  academicYear: number
) {
  await prisma.$transaction(async (tx) => {
    // add student
    const newStudent = await tx.student.create({
      data: {
        name: studentData.name,
        address: studentData.address,
        contact: studentData.contact,
        gurdian: studentData.gurdian,
        iemis: studentData.iemis,
        rollNumber: 0,
      },
    });

    // enroll
    await tx.enrollment.create({
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

export async function getAllStudentByClassAndYear(
  sclassId: number,
  year: number
) {
  const students = await prisma.student.findMany({
    where: {
      enrollment: {
        some: {
          sclassId,
          academicYear: year,
        },
      },
    },
    include: {
      enrollment: {
        include: {
          sclass: true,
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

type updatePayloadType = {
  studentId: number;
  index: number;
};

export async function assignRollNumber(updatePayload: updatePayloadType[]) {
  // this may not be better if 1000s of rows needed to be updated at once (if multiple user use it), because promise.all makes parallel request. instead we can do in batches of 100s, 200s so there is not 1000 request at once.

  await prisma.$transaction(async (tx) => {
    // make array of update promises
    const promiseArray = updatePayload.map((p) =>
      tx.student.update({
        where: {
          id: p.studentId,
        },
        data: {
          rollNumber: p.index + 1,
        },
      })
    );

    // parallely updating all
    const result = await Promise.all(promiseArray);
    // console.log("Result is: ", result);
    // sequentially may be slow
    // parallely may make huge request to db at once
    // use batch updates
  });
}
