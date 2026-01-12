export type Exam = {
  id?: number;
  name: string;
  academicYear: number;
  schoolId: number;
  resultDate?: string;
};

export type Error = {
  name?: string;
  year?: string;
};
export type FormState = {
  errors: Error;
  status: boolean;
};

export type ConfigureExam = {
  classId: number;
  subjects: string[];
  thFm: number;
  thPm: number;
  prFm: number;
  prPm: number;
};

export type ConfigureExamError = {
  classId?: string;
  subjects?: string;
  thFm?: string;
  thPm?: string;
  prFm?: string;
  prPm?: string;
  otherError?: string;
};

export type ConfigureExamFormState = {
  errors: ConfigureExamError;
  data: Partial<ConfigureExamDbType>[];
};

export type ConfigureExamDbType = {
  id?: number;
  examId: number;
  sclassId: number;
  subjectId: number;
  thFullMarks: number;
  thPassMarks: number;
  prFullMarks: number;
  prPassMarks: number;
  sclass?: { name: string };
  subject?: { name: string };
};

export type AddExamReturnType =
  | { success: true; data: ConfigureExamDbType[] }
  | { success: false; error: ConfigureExamError };
