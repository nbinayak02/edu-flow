import { GetAllClasses } from "@/app/_actions/class";
import ErrorBox from "@/components/custom-components/errorBox";
import MarksOperations from "@/components/marks/marks-operations";
import { getSchoolId } from "@/lib/auth";

export default async function MarksPage() {
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">Marks</h1>
      {allClasses ? (
        <MarksOperations classes={allClasses} />
      ) : (
        <ErrorBox />
      )}
    </section>
  );
}
