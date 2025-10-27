"use server";

import { redirect } from "next/navigation";
import { Error, FormState } from "../auth/types";
import { createUser, findUser } from "@/lib/data/user";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
const bcrypt = require("bcrypt");

export async function LoginAction(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const errors: Error = {};

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, status: false, userId: null };
  }

  //get email and password from db
  const user = await findUser(email);

  if (!user) {
    errors.otherErrorMessage = "User doesn't exists. Please proceed to signup.";
    return { errors, status: false, userId: null };
  }

  //decode password
  const isMatched = await bcrypt.compare(password, user?.password);

  if (!isMatched) {
    errors.otherErrorMessage = "Password incorrect.";
    return { errors, status: false, userId: null };
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  //jwt signing
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.fullname,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  //set in cookie
  (await cookies()).set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return { errors, status: true, userId: user.id };
}

export async function SignupAction(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  const fullname = formdata.get("fullName") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const errors: Error = {};

  if (!fullname) {
    errors.fullName = "Full name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, status: false, userId: null };
  }

  const user = await findUser(email);

  if (user) {
    errors.otherErrorMessage = "User already exists. Please proceed to login.";
    return { errors, status: false, userId: null };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const isUserCreated = await createUser({
    fullname,
    email,
    password: hashedPass,
  });

  redirect("/auth/login");
}

export async function Logout() {
  (await cookies()).delete("token");
  redirect("/auth/login");
}
