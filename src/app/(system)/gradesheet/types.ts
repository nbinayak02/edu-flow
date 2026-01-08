import { Exam } from "../exam/types";
import { Marks } from "../marks/types";
import { Enrollment } from "../student/types";

export type MarksheetSearchError = {
  class?: string;
  year?: string;
  exam?: string;
  otherErrors?: string;
};

export type Marksheet = {
  id?: number;
  enrollment?: Enrollment;
  enrollmentId: number;
  exam?: Exam;
  examId: number;
  total?: number;
  gpa: number;
  remarks: string;
  createdAt?: Date;
  updatedAt?: Date;
  marks?: Marks[];
};

export type MarksheetSearch = {
  errors: MarksheetSearchError;
  data: Marksheet[];
};
