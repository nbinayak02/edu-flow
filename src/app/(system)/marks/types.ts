export type StudentSearch = {
  id?: number;
  class: number;
  year: number;
  exam: number;
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
};

export type MarksFormState = {
  errors: MarksError;
}

export type MarksObject = {
  subjectId: number;
  theoryMarks: number;
  practicalMarks: number;
}
