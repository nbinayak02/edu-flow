import ExamOperations from "@/components/feature/exam/exam-operations";
import { getSchoolId } from "@/lib/auth";
import {GetAllExams} from "@/lib/data/exam";

export default async function ExamPage() {
  const schoolId = Number(await getSchoolId());
  const exams = await GetAllExams(schoolId);
  return (
    <section>
      <h1 className="text-2xl font-semibold">Exam</h1>
      <p className=" text-muted-foreground mb-5">Create or manage exams.</p>
      <ExamOperations initialExams={exams} />
    </section>
  );
}
