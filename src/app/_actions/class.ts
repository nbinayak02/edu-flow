"use server";
import {
  CreateNewClass,
  DeleteClass,
  findClassByNameAndSection,
  getAllClasses,
  getClass,
  updateClass,
} from "@/lib/data/class";
import { Error, FormState } from "../(system)/class/types";
import { getSchoolId } from "@/lib/auth";

export async function CreateNewClassAction(_: unknown, formData: FormData) {
  // console.log("Form submitted");
  const name = formData.get("name") as string;

  const errors: Error = {};

  if (!name) {
    errors.name = "Class name is required";
    return { errors };
  }

  const schoolId = Number(await getSchoolId());

  try {
    const existingClass = await findClassByNameAndSection({
      name,
      section: "",
    });

    if (existingClass) {
      errors.name = "Class already exists.";
      return { errors };
    }

    const newClass = await CreateNewClass({ name, schoolId, section: "" });
    return { newClass };
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateClassAction(
  _: unknown,
  formData: FormData,
): Promise<FormState> {
  // console.log("Form submitted");
  const name = formData.get("name") as string;
  const classId = Number(formData.get("classId"));

  const errors: Error = {};

  if (!name) {
    errors.name = "Class name is required";
    return { errors, success: false, data: null };
  }

  try {
    const existingClass = await getClass(classId);

    if (!existingClass) {
      errors.name = "Class doesn't exists.";
      return { errors, success: false, data: null };
    }

    const updated = await updateClass(name, classId);

    return { errors: {}, success: true, data: updated };
  } catch (error) {
    errors.otherError = "Something went wrong!";
    console.log(error);
    return { errors, success: false, data: null };
  }
}

export async function DeleteClassAction(classId: number) {
  try {
    const isDeleted = await DeleteClass(classId);
    console.log("Deleted class: ", isDeleted);
  } catch (error) {
    console.log(error);
  }
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

export async function GetClass(sclassId: number) {
  try {
    const sclass = await getClass(sclassId);
    return sclass;
  } catch (error) {
    console.log("Error on GetClassAction: ", error);
    return null;
  }
}
