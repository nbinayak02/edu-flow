import MarksheetOperation from "@/components/feature/marksheet/marksheet-operations";
import { getSchoolId } from "@/lib/auth";
import { GetAllClasses } from "@/lib/data/class";

export default async function Marksheet() {
  const schoolId = Number(await getSchoolId());
  const allClasses = await GetAllClasses(schoolId);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">Marksheet</h1>
      <MarksheetOperation classes={allClasses} />
    </section>
  );
}
