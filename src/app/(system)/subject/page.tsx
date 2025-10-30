import { getSchoolId } from "@/lib/auth";
import { GetAllClasses } from "@/lib/data/class";
import { GetAllSubjects } from "@/lib/data/subject";
import SubjectOperations from "@/components/feature/subject/subject-operations";

export default async function SubjectPage() {
  const schoolId = Number(await getSchoolId());
  const allSubjects = await GetAllSubjects(schoolId);
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Subject</h1>
      <p className=" text-muted-foreground mb-5">Subjects in each class.</p>
      <SubjectOperations initialSubjects={allSubjects} allClasses={allClasses}/>
    </section>
  );
}
