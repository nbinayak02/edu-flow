import { GetSchoolDetails } from "@/app/_actions/school";
import Welcome from "@/components/feature/dashboard/welcome";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { getUser } from "@/lib/auth";
import Link from "next/link";

export default async function Page() {
  const loggedInUser = await getUser();
  const userSchool = await GetSchoolDetails(loggedInUser.id);

  if (userSchool?.school?.id) {
    return (
      <section>
        <div className="w-full flex flex-col items-center gap-1">
          <h1 className="text-3xl font-extrabold uppercase">
            {userSchool?.school?.name}
          </h1>
          <h3 className="text-[18px]">{userSchool?.school?.address}</h3>
        </div>

        {/* quick links  */}
        <div>
          <h2 className="text-xl font-semibold mt-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            <Card>
              <CardContent>
                <Link href="/student" className="text-lg font-semibold">
                  Admit Students
                </Link>
                <CardDescription>
                  Admit and manage student records.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Link href="/exam" className="text-lg font-semibold">
                  Create Exams
                </Link>
                <CardDescription>
                  Create and manage exams in your school.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Link href="/gradesheet" className="text-lg font-semibold">
                  View Marksheets
                </Link>
                <CardDescription>
                  View, download or print student marksheets.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  } else {
    return <Welcome username={loggedInUser.name} />;
  }
}
