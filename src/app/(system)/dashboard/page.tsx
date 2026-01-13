import { GetSchoolDetails } from "@/app/_actions/school";
import { getUser } from "@/lib/auth";

export default async function Page() {
  const user = await getUser();
  const userSchool = await GetSchoolDetails(user.id);

  return (
    <section>
      <div className="w-full flex flex-col items-center gap-1">
        <h1 className="text-3xl font-extrabold uppercase">
          {userSchool?.school?.name}
        </h1>
        <h3 className="text-[18px]">{userSchool?.school?.address}</h3>
      </div>
    </section>
  );
}
