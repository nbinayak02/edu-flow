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
  studentId: number;
  sclassId: number;
  examId: number;
  total: number;
  gradeLetter: string;
  gpa: number;
  remarks: string;
};

// for marks table
export type Marks = {
  id?: number;
  marksheetId: number;
  subjectId: number;
  theoryMarks: number;
  practicalMarks: number;
};
