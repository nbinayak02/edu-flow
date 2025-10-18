"use server";
import { headers } from "next/headers";
import { prisma } from "./prisma";

export async function getUser() {
  const header = await headers();
  const userHeader = header.get("x-user-data");

  if (!userHeader) {
    console.log("X-User-Data header not found");
    return null;
  }

  console.log("X-User-Data header found");

  const userdata = JSON.parse(userHeader);
  return userdata;
}

export async function getSchoolId() {
  const user = await getUser();
  const school = await prisma.school.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  return school?.id;
}
