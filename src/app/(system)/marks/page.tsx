import MarksOperations from "@/components/marks/marks-operations";
import { getSchoolId } from "@/lib/auth";
import { GetAllClasses } from "@/lib/data/class";

export default async function MarksPage() {
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">Marks</h1>
      <MarksOperations classes={allClasses} />
     
    </section>
  );
}
