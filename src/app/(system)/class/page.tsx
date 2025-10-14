import { GetAllClasses } from "@/lib/data/class";
import { getSchoolId } from "@/lib/auth";

import ClassOperations from "@/components/feature/class/class-operations";
import { Class } from "./types";

export default async function ClassPage() {
  const schoolId = Number(await getSchoolId());
  const allClasses: Class[] = await GetAllClasses(schoolId);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Class</h1>
      <p className=" text-muted-foreground mb-5">Classes in your school.</p>
      <ClassOperations initialClasses={allClasses} />
    </section>
  );
}
