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

export type AssignSubjectFormState = {
  errors: AssignSubjectError;
  success: boolean;
};

// subject module ui dialogs
export enum dialogEnum {
  create,
  assign,
}

export type SubjectAssignedWithClass = SubjectAssigned & { sclass: Sclass };

export type SubjectWithClassAssigned = Subject & {
  subjectAssigned: SubjectAssignedWithClass[];
};
