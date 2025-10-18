import { AddSubjectMarksDialog } from "@/components/feature/dialog/exam-manage-addSubjects";
import { getSchoolId } from "@/lib/auth";
import { GetAllClasses } from "@/lib/data/class";
import { GetAllSubjects, GetSubjectsByClass } from "@/lib/data/subject";

export default async function ExamManagePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = (await params).id;
  let examName = (await searchParams).exam;
  let examYear = (await searchParams).year;

  return (
    <section>
      <h1 className="text-2xl font-semibold">
        {examName}-{examYear}
      </h1>
      <p className=" text-muted-foreground mb-5">Add exam info, marks etc.</p>
    </section>
  );
}
