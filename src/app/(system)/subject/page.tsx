import { getSchoolId } from "@/lib/auth";

import SubjectOperations from "@/components/feature/subject/subject-operations";
import { GetAllClasses } from "@/app/_actions/class";
import ErrorBox from "@/components/custom-components/errorBox";
import { GetAllSubjectBySchool } from "@/app/_actions/subject";

export default async function SubjectPage() {
  const schoolId = Number(await getSchoolId());
  const allSubjects = await GetAllSubjectBySchool(schoolId);
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Subject</h1>
      <p className=" text-muted-foreground mb-5">Subjects in each class.</p>
      {allClasses && allSubjects ? (
        <SubjectOperations
          initialSubjects={allSubjects}
          allClasses={allClasses}
        />
      ) : (
        <ErrorBox />
      )}
    </section>
  );
}
