"use server";

import { Error, FormState } from "../(system)/school/types";
import { CreateOrUpdateSchool, findSchoolByUser } from "@/lib/data/school";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
  const logoPublicId = formdata.get("logo_public_id") as string;

  const errors: Error = {};
  const user = await getUser();

  if (!name) errors.name = "School name is required";
  if (!address) errors.address = "Address is required";
  if (!email) errors.email = "Email is required";
  if (!contact) errors.contact = "Contact number is required";
  if (!iemis) errors.iemis = "IEMIS is required";
  if (!estd) errors.estd = "Eastablished year is required";

  if (Object.keys(errors).length > 0) {
    return { errors, status: false };
  }

  await CreateOrUpdateSchool(user.id, {
    name,
    address,
    email,
    contact,
    iemis,
    estd,
    logoPublicId,
  });

  revalidatePath("/school");
  return { errors, status: true };
}

export async function GetSchoolDetails(userId: number) {
  try {
    const school = await findSchoolByUser(userId);
    return school;
  } catch (error) {
    console.log("Error on GetSchoolDetails: ", error);
    return null;
  }
}
