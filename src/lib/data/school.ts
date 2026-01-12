import { EmptySchool, School } from "@/app/(system)/school/types";
import prisma from "../prisma";

export async function findSchoolByUser(userId: number) {
  const sch = await prisma.school.findUnique({
    where: {
      userId: userId,
    },
  });
  return sch;
}

export async function updateSchool(data: School) {
  const school = await prisma.school.update({
    where: {
      userId: data.userId,
    },
    data: {
      address: data.address,
      contact: data.contact,
      email: data.email,
      estd: data.estd,
      iemis: data.iemis,
      name: data.name,
      logoPublicId: data.logoPublicId ?? "eduflow_school_default_logo",
    },
  });

  return school;
}

export async function createSchool(userId: number, data: School) {
  const school = await prisma.school.create({
    data: {
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      iemis: data.iemis,
      estd: data.estd,
      userId: userId,
      logoPublicId: data.logoPublicId ?? "eduflow_school_default_logo",
    },
  });

  return school;
}
