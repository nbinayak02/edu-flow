"use server";
import {
  assignSubject,
  createNewSubject,
  getAllSubjects,
  getAllSubjectsWithClassAssigned,
  getSubjectsByClass,
} from "@/lib/data/subject";
import {
  AssignSubjectError,
  AssignSubjectFormState,
  CreateSubjectError,
  FormState,
} from "../(system)/subject/types";
import { getSchoolId } from "@/lib/auth";
import { SubjectAssigned } from "@prisma/client";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function CreateNewSubjectAction(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;

  const errors: CreateSubjectError = {};

  if (!name) {
    errors.name = "Subject name is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, data: null };
  }

  try {
    const schoolId = await getSchoolId();
    if (!schoolId) throw new Error("School id not found");
    const newSubject = await createNewSubject({ name, schoolId });
    // revalidatePath("/subject");
    return { errors: {}, data: newSubject };
  } catch (error) {
    return {
      errors: { otherError: "Something went wrong, Please try again later." },
      data: null,
    };
  }
}

export async function GetSubjectByClassAction(classId: number) {
  try {
    const subjects = await getSubjectsByClass(classId);
    const payload = subjects.map((s) => {
      return {
        id: s.subject.id,
        name: s.subject.name,
        credit_hour: s.credit_hour,
        schoolId: s.subject.schoolId,
        sclassId: s.sclassId,
        createdAt: s.subject.createdAt,
      };
    });
    return payload;
  } catch (error) {
    console.log("Error on GetSubjectByClass: ", error);
    return null;
  }
}

export async function GetAllSubjectBySchool() {
  unstable_noStore();
  try {
    const schoolId = await getSchoolId();
    if (!schoolId) throw new Error("School Id not found!");
    const subjects = await getAllSubjects(schoolId);
    return subjects;
  } catch (error) {
    console.log("Error on GetSubjectBySchool: ", error);
    return null;
  }
}

export async function AssignSubject(
  _: unknown,
  formData: FormData
): Promise<AssignSubjectFormState> {
  const sclassId = Number(formData.get("sclass"));
  const subjectsIds = formData.get("subjects") as String;
  const credit_hour = Number(formData.get("creditHour"));

  const errors: AssignSubjectError = {};

  if (!sclassId) errors.sclass = "Please select a class";
  if (!subjectsIds) errors.subjects = "Please select subjects";
  if (!credit_hour) errors.credit_hour = "Please provide credit hour";

  if (Object.entries(errors).length > 0) {
    return { errors, success: false };
  }

  const subjects = subjectsIds.split(",");

  try {
    const payload: SubjectAssigned[] = subjects.map((sid: string) => {
      return {
        subjectId: Number(sid),
        sclassId,
        credit_hour,
      };
    });
    await assignSubject(payload);
    revalidatePath("/subject");
    return { errors: {}, success: true };
  } catch (error) {
    console.log("Error at AssignSubject: ", error);
    return {
      errors: { otherError: "Something went wrong, Please try again later!" },
      success: false,
    };
  }
}

export async function GetAllSubjectWithClassAssigned() {
  try {
    const schoolId = await getSchoolId();
    if (!schoolId) throw new Error("School Id not found!");
    const subjects = await getAllSubjectsWithClassAssigned(schoolId);
    return subjects;
  } catch (error) {
    console.log("Error on GetSubjectBySchool: ", error);
    return null;
  }
}
