"use server";
import { CreateNewClass, DeleteClass } from "@/lib/data/class";
import { Class, Error, FormState } from "../(system)/class/types";
import { getSchoolId } from "@/lib/auth";

export async function CreateNewClassAction(
  prevState: FormState,
  formData: FormData
) {
  console.log("Form submitted");
  const name = formData.get("name") as string;

  const errors: Error = {};

  if (!name) {
    errors.name = "Class name is required";
    return { errors };
  }
  const schoolId = Number(await getSchoolId());

  const newClass = await CreateNewClass(schoolId, { name });
  return { newClass };
}

export async function DeleteClassAction(formData: FormData) {
  console.log("The formdata: ", formData);
  // const id = Number(formData.get("id") as string);
  // const isDeleted = await DeleteClass(id);
  // console.log("IS deleted? ", isDeleted);
}
