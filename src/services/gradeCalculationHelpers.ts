import { Marks } from "@/app/(system)/marks/types";
import { GradePointScale } from "@/lib/gradeScale";
import {
  CreditHourType,
  FinalGradeType,
  FullMarks,
  PercentageType,
} from "@/lib/types";

function calculatePercent(obtainedMarks: number, fullMarks: number) {
  if (fullMarks === 0) {
    return 0;
  }

  return (obtainedMarks / fullMarks) * 100;
}

export function calculatePercentage(
  obtainedMarks: Marks[],
  fullMarks: FullMarks[]
) {
  var returnArray: PercentageType[] = [];

  //for all obtained marks
  obtainedMarks.map((om) => {
    // find full marks of this particular subject
    const subjectFullMarks = fullMarks.find(
      (fm) => fm.subjectId === om.subjectId
    );

    //calculate th percentage of that subject
    const percentTh = calculatePercent(
      om.theoryMarks,
      subjectFullMarks?.thFullMarks ?? 0
    );

    //calculate pr percentage of that subject
    const percentPr = calculatePercent(
      om.practicalMarks,
      subjectFullMarks?.prFullMarks ?? 0
    );

    // push to returnArray
    returnArray.push({
      subjectId: om.subjectId,
      theoryPercent: Number(percentTh.toFixed(2)),
      practicalPercent: Number(percentPr.toFixed(2)),
    });
  });

  return returnArray;
}

export function calculateFinalGrade(marksInPercent: PercentageType[]) {
  var returnArray: FinalGradeType[] = [];

  marksInPercent.map((marks) => {
    //find grade scale where th percent lies
    const thGradeScale = GradePointScale.find(
      (gps) => marks.theoryPercent >= gps.min && marks.theoryPercent <= gps.max
    );

    //find grade scale where pr percent lies
    const prGradeScale = GradePointScale.find(
      (gps) =>
        marks.practicalPercent >= gps.min && marks.practicalPercent <= gps.max
    );

    //find average of th and pr grade point
    const averageOfThAndPrGrades =
      (thGradeScale && prGradeScale
        ? (thGradeScale.gradePoint + prGradeScale.gradePoint) / 2
        : thGradeScale?.gradePoint) ?? 0;

    //find final grade point scale
    const finalGpaScale =
      averageOfThAndPrGrades < 1.6
        ? GradePointScale[GradePointScale.length - 1]
        : GradePointScale.find(
            (gps) =>
              averageOfThAndPrGrades > (gps.gradePoint - 0.4) &&
              averageOfThAndPrGrades <= gps.gradePoint //starting from 1.6 the interval is of 0.4
          ) ?? {
            min: 0,
            max: 0,
            description: "",
            gradeLetter: "",
            gradePoint: 0,
          };

    //now push to return array
    returnArray.push({
      subjectId: marks.subjectId,
      theoryPercent: marks.theoryPercent,
      practicalPercent: marks.practicalPercent,
      theoryGradePoint: thGradeScale?.gradePoint ?? 0,
      practicalGradePoint: prGradeScale?.gradePoint ?? 0,
      thGradeLetter: thGradeScale?.gradeLetter ?? "",
      prGradeLetter: prGradeScale?.gradeLetter ?? "",
      finalGradePoint: averageOfThAndPrGrades ?? 0,
      finalGradeLetter: finalGpaScale.gradeLetter,
    });
  });

  return returnArray;
}

export function calculateGPA(
  creditHour: CreditHourType[],
  allSubjectFinalGrades: FinalGradeType[]
) {
  // for all subjects
  const products: number[] = allSubjectFinalGrades.map((fg) => {
    // find credit hour
    const crh = creditHour.find((c) => c.id === fg.subjectId)?.credit_hour ?? 0;

    // find product of credit hour and final grade point
    return crh * fg.finalGradePoint;
  });

  // console.log("Products: ", products);

  // find sum of all products
  const sum = products.reduce(
    (totalSum, currentProduct) => totalSum + currentProduct,
    0
  );

  // find total credit hour
  const totalCrh = creditHour.reduce(
    (totalSum, currentCrh) => totalSum + currentCrh.credit_hour,
    0
  );

  // find gpa
  const gpa = sum / totalCrh;

  // console.log(`GPA: ${gpa} Total CH: ${totalCrh} Total Marks: ${sum}`);

  return { gpa, totalCrh };
}
