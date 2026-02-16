import { FormError } from "@/lib/types/global.types";
import { Sclass, Subject, SubjectAssigned } from "@prisma/client";

export type createPayload = Omit<Subject, "id" | "createdAt">;

export interface CreateSubjectError extends FormError {
  name?: string;
}

export type FormState = {
  errors: CreateSubjectError;
  data: Subject | null;
};

export interface AssignSubjectError extends FormError {
  sclass?: string;
  subjects?: string;
  credit_hour?: string;
}

export interface UpdateSubjectError extends FormError, AssignSubjectError {
  name?: string;
}

export type AssignSubjectFormState = {
  errors: AssignSubjectError;
  success: boolean;
};

export type UpdateSubjectFormState = {
  errors: UpdateSubjectError;
  success: boolean;
  data: Subject | SubjectAssigned[] | null;
};

export type UpdateSubAssignFormState = {
  errors: AssignSubjectError;
  success: boolean;
};

export type SubjectAssignedWithClass = SubjectAssigned & { sclass: Sclass };

export type SubjectWithClassAssigned = Subject & {
  subjectAssigned: SubjectAssignedWithClass[];
};

export enum subjectDialogEnum {
  editSubject,
  editSubAssigned,
  deleteSubAssigned,
  delete,
  create,
  assign,
  none,
}

export type handleAssignPayload = {
  className: string;
  subjectName: string;
  credit_hour: number;
  subjectId: number;
  classId: number;
};
