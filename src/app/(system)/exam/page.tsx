import { GetAllExamAction } from "@/app/_actions/exam";
import ErrorBox from "@/components/custom-components/errorBox";
import ExamOperations from "@/components/feature/exam/exam-operations";
import { getSchoolId } from "@/lib/auth";

export default async function ExamPage() {
  const schoolId = Number(await getSchoolId());
  const exams = await GetAllExamAction(schoolId);
  return (
    <section>
      <h1 className="text-2xl font-semibold">Exam</h1>
      <p className=" text-muted-foreground mb-5">Create or manage exams.</p>
      {exams ? <ExamOperations initialExams={exams} /> : <ErrorBox />}
    </section>
  );
}
