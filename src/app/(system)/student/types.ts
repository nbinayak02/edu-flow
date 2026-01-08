import { Sclass } from "@prisma/client";
import { Marksheet } from "../gradesheet/types";
import { Class } from "../class/types";

export type Student = {
  id?: number;
  name: string;
  address: string;
  contact: string;
  gurdian: string;
  iemis: string;
  enrollment?: Enrollment[];
};

export type StudentError = {
  name?: string;
  address?: string;
  contact?: string;
  gurdian?: string;
  year?: string;
  iemis?: string;
  sclass?: string;
};

export type FormState = {
  errors?: StudentError;
  success?: boolean;
};

export type Enrollment = {
  id?: number;
  student?: Student;
  sclass?: Class;
  studentId?: number;
  sclassId?: number;
  academicYear?: number;
  createdAt?: Date;
  updatedAt?: Date;
  marksheets?: Marksheet;
};
