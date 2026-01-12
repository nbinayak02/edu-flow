import { GetAllClasses } from "@/app/_actions/class";
import ErrorBox from "@/components/custom-components/errorBox";
import MarksOperations from "@/components/marks/marks-operations";
import { getSchoolId } from "@/lib/auth";

export default async function MarksPage() {
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Marks</h1>
      <p className=" text-muted-foreground mb-5">Save/View Marks</p>

      {allClasses ? <MarksOperations classes={allClasses} /> : <ErrorBox />}
    </section>
  );
}
