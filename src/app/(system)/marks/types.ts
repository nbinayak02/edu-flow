import { Class } from "../class/types";
import { Exam } from "../exam/types";
import { Enrollment, Student } from "../student/types";
import { Subject } from "../subject/types";

export type StudentSearch = {
  id?: number;
  class: number;
  year: number;
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

export type SubjectSearchReturn = {
  id: number;
  name: string;
};

export type FetchedDataType = {
  students: StudentSearchReturn[];
  subjects: SubjectSearchReturn[];
};

export type StudentSearchFormState = {
  errors: StudentSearchError;
  data: FetchedDataType;
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
};

export type UpdateGradeInMarksType = {
  subjectId: number;
  thGradeLetter: string;
  prGradeLetter: string;
  finalGrade: string;
  gradePoint: number;
};

export type MarksInMarksheet = {
  marksheetId: number;
  subjectId: number;
  thGradeLetter: string;
  prGradeLetter: string;
  finalGrade: string;
  gradePoint: number;
  subject?: Subject;
};
