import { getSchoolId } from "@/lib/auth";
import SubjectOperations from "@/components/feature/subject/subject-operations";
import ErrorBox from "@/components/custom-components/errorBox";
import { GetAllSubjectWithClassAssigned } from "@/app/_actions/subject";
import { GetAllClasses } from "@/app/_actions/class";

export default async function SubjectPage() {
  const schoolId = Number(await getSchoolId());
  const allSubjects = await GetAllSubjectWithClassAssigned();
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Subject</h1>
      <p className=" text-muted-foreground mb-5">Subjects in each class.</p>
      {allClasses && allSubjects ? (
        <SubjectOperations subjects={allSubjects} allClasses={allClasses} />
      ) : (
        <ErrorBox />
      )}
    </section>
  );
}
