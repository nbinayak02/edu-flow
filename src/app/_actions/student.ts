"use server";
import { AddStudent } from "@/lib/data/student";
import { Student, FormState, Error } from "../(system)/student/types";

export async function AddStudentAction(
  prevState: FormState,
  formData: FormData
) {

  console.log("Form data: ", formData);
  
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const contact = formData.get("contact") as string;
  const gurdian = formData.get("gurdian") as string;
  const year = Number(formData.get("year"));
  const iemis = formData.get("iemis") as string;
  const sclassId = Number(formData.get("sclass"));

  const errors: Error = {};

  if(!sclassId) errors.sclass = "Please select class."
  if (!name) errors.name = "Name is required";
  if (!address) errors.address = "Address is required";
  if (!contact) errors.contact = "Contact is required";
  if (!year) errors.year = "Year is required";
  if (!iemis) errors.iemis = "IEMIS is required";

  if (Object.keys(errors).length > 0) return { errors };

  const studentData: Student = {
    name,
    address,
    contact,
    gurdian,
    year,
    iemis,
    sclassId,
  };

  const newStudent = await AddStudent(studentData);

  return { newStudent };
}
