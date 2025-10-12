import { EmptySchool, School } from "@/app/(system)/school/types";
import { prisma } from "../prisma";

export async function findSchoolByUser(userId: number) {
  const sch = await prisma.school.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!sch) {
    const s: EmptySchool = {
      name: "",
      address: "",
      contact: "",
      email: "",
      estd: undefined,
      iemis: "",
    };

    return s;
  } else {
    return sch;
  }
}

export async function CreateOrUpdateSchool(userId: number, data: School) {
  const update = await prisma.school.upsert({
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
    },
    create: {
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      iemis: data.iemis,
      estd: data.estd,
      userId: userId,
    },
  });

  console.log("Updated? ", update);
}
