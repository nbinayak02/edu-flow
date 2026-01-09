import SchoolCard from "@/components/custom-components/school-card";
import { getUser } from "@/lib/auth";
import { findSchoolByUser } from "@/lib/data/school";
export default async function SchoolPage() {
  const user = await getUser();
  const userSchool = await findSchoolByUser(user.id);
  return (
    <section>
      <h1 className="text-2xl font-semibold">School</h1>
      <p className=" text-muted-foreground mb-5">Your school details.</p>
      <SchoolCard userSchool={userSchool} />
    </section>
  );
}
