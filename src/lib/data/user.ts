import { User } from "@/app/auth/types";
import prisma from "../prisma";

export function findUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export function createUser(user: User) {
  return prisma.user.create({
    data: user,
  });
}

export async function updateUserSchool(userId: number, schoolId: number) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      schoolId: schoolId,
    },
  });
}
