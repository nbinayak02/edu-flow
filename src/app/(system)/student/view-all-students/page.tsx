import { GetAllClasses } from "@/app/_actions/class";
import ErrorBox from "@/components/custom-components/errorBox";
import GoBack from "@/components/custom-components/goBackButton";
import ViewAllStudentsOperation from "@/components/feature/student/view-all-students-operations";
import { getSchoolId } from "@/lib/auth";

export default async function Page() {
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold flex gap-5 items-center mb-5">
        <GoBack />
        <span>View All Students</span>
      </h1>
      {allClasses ? (
        <ViewAllStudentsOperation allClasses={allClasses} />
      ) : (
        <ErrorBox />
      )}
    </section>
  );
}
