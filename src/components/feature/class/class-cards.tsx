"use client";

import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function ClassCard({
  className,
  classId,
}: {
  className: string;
  classId: number;
}) {
  return (
    <Card>
      <CardHeader>
        Class {className}
        <CardAction className="space-x-10">
          {/* <Button variant={"secondary"}>Assign Subjects</Button> */}
          <EditDeleteOptions />
        </CardAction>
      </CardHeader>
      {/* <CardContent className="flex justify-evenly">
        <CardDescription className="font-semibold">
          Students: 100
        </CardDescription>
        <CardDescription className="font-semibold">
          Subjects: 100
        </CardDescription>
      </CardContent> */}
    </Card>
  );
}
