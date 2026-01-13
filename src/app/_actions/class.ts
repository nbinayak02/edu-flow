"use server";
import { CreateNewClass, getAllClasses, getClass } from "@/lib/data/class";
import {  Error } from "../(system)/class/types";
import { getSchoolId } from "@/lib/auth";

export async function CreateNewClassAction(
  _: unknown,
  formData: FormData
) {
  // console.log("Form submitted");
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
  // console.log("The formdata: ", formData);
  // const id = Number(formData.get("id") as string);
  // const isDeleted = await DeleteClass(id);
  // console.log("IS deleted? ", isDeleted);
}

export async function GetAllClasses(schoolId: number) {
  try {
    const classes = await getAllClasses(schoolId);
    return classes;
  } catch (error) {
    console.log("Error on GetAllClasses: ", error);
    return null;
  }
}

export async function GetClass(sclassId: number){
  try {
    const sclass = await  getClass(sclassId);
    return sclass;
  } catch (error) {
    console.log("Error on GetClassAction: ", error);
    return null;
  }
}