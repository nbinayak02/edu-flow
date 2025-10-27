import { GetExamDetailsAction } from "@/app/_actions/exam";
import { AddSubjectMarksDialog } from "@/components/feature/dialog/exam-manage-addSubjects";
import ExamDetailsOperations from "@/components/feature/exam/exam-details-operations";
import { getSchoolId } from "@/lib/auth";
import { GetAllClasses } from "@/lib/data/class";

export default async function ExamManagePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const examId = (await params).id;
  let examName = searchParams.exam;
  let examYear = searchParams.year;
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);

  // if (examId) {
  const examDetails = await GetExamDetailsAction(examId);
  // } else {
  //throw error for invalid url format
  // }

  return (
    <section>
      <h1 className="text-2xl font-semibold">
        {examName}-{examYear}
      </h1>
      <p className=" text-muted-foreground mb-5">Add exam info, marks etc.</p>
      <ExamDetailsOperations
        initialDetails={examDetails}
        allClasses={allClasses}
        examId={examId}
      />
    </section>
  );
}
