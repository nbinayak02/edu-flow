"use server";
import { CreateNewSubject } from "@/lib/data/subject";
import { Error, FormState, Subject } from "../(system)/subject/types";

export async function CreateNewSubjectAction(
  prevState: FormState,
  formData: FormData
) {
  console.log("Form submitted");

  const name = formData.get("name") as string;
  const credit_hour = Number(formData.get("creditHour"));
  const sclassId = Number(formData.get("sclass"));

  const errors: Error = {};

  if (!name) {
    errors.name = "Subject name is required";
  }

  if (!credit_hour) {
    errors.creditHour = "Credit hour is required";
  }

  if (isNaN(sclassId)) {
    errors.classId = "Please select appropriate class";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const subject: Subject = {
    name,
    credit_hour,
    sclassId,
  };

  const newSubject = await CreateNewSubject(subject);

  return { newSubject };
}
