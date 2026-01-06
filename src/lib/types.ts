export type FullMarks = {
  examId: number;
  sclassId: number;
  subjectId: number;
  thFullMarks: number;
  prFullMarks: number;
};

export interface PercentageType {
  subjectId: number;
  theoryPercent: number;
  practicalPercent: number;
}

export interface FinalGradeType extends PercentageType {
  theoryGradePoint: number;
  practicalGradePoint: number;
  finalGrade: number;
  gradeLetter: string;
}

export type CreditHourType = {
  id: number;
  credit_hour: number;
};
