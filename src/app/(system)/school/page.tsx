import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateDialog } from "@/components/update-school-dialog";
import getUser from "@/lib/auth";
import { findSchoolByUser } from "@/lib/data/school";

export default async function SchoolPage() {
  const user = await getUser();
  const userSchool = await findSchoolByUser(user.id);

  return (
    <section>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>{userSchool?.name}</CardTitle>
          <CardDescription>{userSchool?.address}</CardDescription>
          <CardDescription>ESTD:{userSchool?.estd}</CardDescription>
          <CardAction>
            <UpdateDialog schoolData={userSchool}/>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row gap-3">
          <div>
            <p>Email:</p>
            <p>Contact Number: </p>
            <p>IEMIS: </p>
          </div>
          <div>
            <p>{userSchool?.email}</p>
            <p>{userSchool?.contact}</p>
            <p>{userSchool?.iemis}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
