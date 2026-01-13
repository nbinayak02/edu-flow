"use server";
import { cookies, headers } from "next/headers";
import prisma from "./prisma";
import { jwtVerify } from "jose";
import { GetSchoolDetails } from "@/app/_actions/school";

export async function getUser() {
  const header = await headers();
  const userHeader = header.get("x-user-data");

  if (!userHeader) {
    return null;
  }

  const userdata = JSON.parse(userHeader);
  return userdata;
}

export async function getSchoolId() {
  const user = await getUser();
  const details = await GetSchoolDetails(user?.id);

  return details?.school?.id;
}

export async function getUserFromToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.id;
  } catch (error) {
    console.log("Error in getUserFromToken: ", error);
  }
}
