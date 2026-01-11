import { GetAllClasses } from "@/app/_actions/class";
import { GetStudentsBySchoolId } from "@/app/_actions/student";
import ErrorBox from "@/components/custom-components/errorBox";
import StudentOperations from "@/components/feature/student/student-operations";
import { getSchoolId } from "@/lib/auth";

export default async function Student() {
  const schoolId = Number(await getSchoolId());
  const newStudents = await GetStudentsBySchoolId(schoolId);
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Students</h1>
      <p className=" text-muted-foreground mb-5">Students in each class.</p>
      {allClasses ? (
        <StudentOperations
          initialStudents={newStudents}
          allClasses={allClasses}
        />
      ) : (
        <ErrorBox />
      )}
    </section>
  );
}
