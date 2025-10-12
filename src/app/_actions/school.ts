"use server";

import { redirect } from "next/navigation";
import { Error, FormState } from "../(system)/school/types";
import { CreateOrUpdateSchool } from "@/lib/data/school";
import getUser from "@/lib/auth";

export async function UpdateSchoolAction(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  const name = formdata.get("name") as string;
  const address = formdata.get("address") as string;
  const email = formdata.get("email") as string;
  const contact = formdata.get("contact") as string;
  const iemis = formdata.get("iemis") as string;
  const estd = Number(formdata.get("estd"));

  const errors: Error = {};
  const user = await getUser();

  if (!name) errors.name = "School name is required";
  if (!address) errors.address = "Address is required";
  if (!email) errors.email = "Email is required";
  if (!contact) errors.contact = "Contact number is required";
  if (!iemis) errors.iemis = "IEMIS is required";
  if (!estd) errors.estd = "Eastablished year is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await CreateOrUpdateSchool(user.id, {name, address, email, contact, iemis, estd})
  redirect("/school");

}
