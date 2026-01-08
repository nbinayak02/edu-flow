import { getUser } from "@/lib/auth";
import { findSchoolByUser } from "@/lib/data/school";

export default async function Page() {
  const user = await getUser();
  const userSchool = await findSchoolByUser(user.id);

  return (
    <section>
      <div className="w-full flex flex-col items-center gap-1">
        <h1 className="text-3xl font-extrabold uppercase">
          {userSchool?.name}
        </h1>
        <h3 className="text-[18px]">{userSchool?.address}</h3>
      </div>
    </section>
  );
}
