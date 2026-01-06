export type MarksheetSearchError = {
  class?: string;
  year?: string;
  exam?: string;
  otherErrors?: string;
};

export type Marksheet = {
  id?: number;
  studentId: number;
  sclassId: number;
  examId: number;
  total?: number;
  gradeLetter?: string;
  gpa: number;
  remarks: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type MarksheetSearch = {
  errors: MarksheetSearchError;
  data: Marksheet[];
};
