import { Subject } from "@prisma/client";
import { Exam } from "../exam/types";
import { Enrollment, StudentSearch } from "../student/types";

export type SubjectSearchReturn = {
  id: number;
  name: string;
};

export type StudentSearchError = {
  class?: string;
  year?: string;
  exam?: string;
  otherErrors?: string;
};

export type StudentSearchReturn = {
  id: number;
  name: string;
  enrollment: Enrollment[];
};

export type StudentSearchFormState = {
  errors?: StudentSearchError;
  data?: StudentSearch[];
  success: boolean;
};

export type MarksError = {
  exam?: string;
  student?: string;
  subjectError?: string;
  otherError?: string;
};

export type MarksFormState = {
  errors: MarksError;
  message: string;
};

export type MarksObject = {
  subjectId: number;
  theoryMarks: number;
  practicalMarks: number;
};

// for marksheet table
export type Marksheet = {
  id?: number;
  enrollment?: Enrollment;
  enrollmentId: number;
  exam?: Exam;
  examId: number;
  totalCreditHour?: number;
  gpa?: number;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// for marks table
export type Marks = {
  id?: number;
  marksheetId: number;
  subjectId: number;
  theoryMarks: number;
  practicalMarks: number;
  marksheet?: Marksheet;
  subject?: Subject;
};

export type UpdateGradeInMarksType = {
  subjectId: number;
  thGradeLetter: string;
  prGradeLetter: string;
  finalGrade: string;
  gradePoint: number;
};

export type MarksDetails = {
  subjectName: string;
  credit_hour: number | undefined;
  thGradeLetter: string;
  prGradeLetter: string;
  finalGrade: string;
  gradePoint: number;
};

type MarksSearchError = {
  sclass?: string;
  year?: string;
  otherErrors?: string;
};

export type MarksSearch = {
  success: boolean;
  data?: Marks;
  error?: MarksSearchError;
};
