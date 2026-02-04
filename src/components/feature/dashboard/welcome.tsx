import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function Welcome({ username }: { username: string }) {
  return (
    <section>
      <div className="text-center ">
        <h1 className="text-3xl font-black uppercase pb-2">
          Welcome to EduFlow, {username}
        </h1>
        <h3>Take a first step towards digital marks management system.</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent>
            <Link href="/school" className="text-lg font-semibold">
              Setup School
            </Link>
            <CardDescription>
              Configure your school details and settings.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Link href="/class" className="text-lg font-semibold">
              Create Classes
            </Link>
            <CardDescription>
              Create and manage classes for your school.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Link href="/subject" className="text-lg font-semibold">
              Add Subjects
            </Link>
            <CardDescription>
              Define subjects offered in your school.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Link href="/student" className="text-lg font-semibold">
              Admit Students
            </Link>
            <CardDescription>Admit and manage student records.</CardDescription>
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
            <Link href="/marks" className="text-lg font-semibold">
              Enter Marks
            </Link>
            <CardDescription>
              Enter and manage student marks for exams.
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
    </section>
  );
}
