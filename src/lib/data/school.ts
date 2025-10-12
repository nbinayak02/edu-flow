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
