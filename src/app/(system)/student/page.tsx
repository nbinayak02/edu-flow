import StudentOperations from "@/components/feature/student/student-operations";
import { getSchoolId } from "@/lib/auth";
import { GetAllClasses } from "@/lib/data/class";
import { GetNewStudents } from "@/lib/data/student";

export default async function Student() {
  const schoolId = Number(await getSchoolId());
  const newStudents = await GetNewStudents(schoolId);
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Students</h1>
      <p className=" text-muted-foreground mb-5">Students in each class.</p>
      <StudentOperations initialStudents={newStudents} allClasses={allClasses}/>
    </section>
  );
}
