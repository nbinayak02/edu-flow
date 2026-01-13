import { Sclass } from "@prisma/client";
import { Marksheet } from "../gradesheet/types";


export interface Student {
  id?: number;
  name: string;
  address: string;
  contact: string;
  gurdian: string;
  iemis: string;
  rollNumber: number;
}

export interface StudentSearch extends Student {
  enrollment: {
    sclass: {
      name: string;
    },
    id: number;
    academicYear: number;
  }[]
}

export type Info = {
  selectedClass: number;
  selectedYear: number;
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
  sclass?: Sclass;
  studentId?: number;
  sclassId?: number;
  academicYear?: number;
  createdAt?: Date;
  updatedAt?: Date;
  marksheets?: Marksheet;
};
