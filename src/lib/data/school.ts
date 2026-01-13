import prisma from "../prisma";
import { CreatePayload, UpdatePayload } from "@/app/(system)/school/types";

export async function findSchoolByUser(userId: number) {
  const sch = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullname: true,
      school: true,
    },
  });
  return sch;
}

export async function updateSchool(data: UpdatePayload) {
  const school = await prisma.school.update({
    where: {
      id: data.id,
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

export async function createSchool(data: CreatePayload) {
  const school = await prisma.school.create({
    data: {
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      iemis: data.iemis,
      estd: data.estd,
      logoPublicId: data.logoPublicId ?? "eduflow_school_default_logo",
    },
  });

  return school;
}
