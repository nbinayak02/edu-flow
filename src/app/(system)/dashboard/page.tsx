import { GetSchoolDetails } from "@/app/_actions/school";
import Welcome from "@/components/feature/dashboard/welcome";
import { getUser } from "@/lib/auth";

export default async function Page() {
  const loggedInUser = await getUser();
  const userSchool = await GetSchoolDetails(loggedInUser.id);

  if (userSchool?.school?.id) {
    console.log("User School:", userSchool);
   return <section>
      <div className="w-full flex flex-col items-center gap-1">
        <h1 className="text-3xl font-extrabold uppercase">
          {userSchool?.school?.name}
        </h1>
        <h3 className="text-[18px]">{userSchool?.school?.address}</h3>
      </div>
    </section>;
  } else {
    return <Welcome username={loggedInUser.name} />;
  }
}
