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

export async function CreateOrUpdateSchool(userId: number, data: School) {
  await prisma.school.upsert({
    where: {
      userId: userId,
    },
    update: {
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      iemis: data.iemis,
      estd: data.estd,
      logoPublicId: data.logoPublicId,
    },
    create: {
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      iemis: data.iemis,
      estd: data.estd,
      userId: userId,
      logoPublicId: data.logoPublicId,
    },
  });
}
