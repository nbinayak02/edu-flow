import { getSchoolId } from "@/lib/auth";

import ClassOperations from "@/components/feature/class/class-operations";
import { GetAllClasses } from "@/app/_actions/class";
import ErrorBox from "@/components/custom-components/errorBox";

export default async function ClassPage() {
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Class</h1>
      <p className=" text-muted-foreground mb-5">Classes in your school.</p>
      {allClasses ? (
        <ClassOperations initialClasses={allClasses} />
      ) : (
        <ErrorBox />
      )}
    </section>
  );
}
