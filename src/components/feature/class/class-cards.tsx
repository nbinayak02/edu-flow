"use client";

import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Card, CardAction, CardHeader } from "@/components/ui/card";


export default function ClassCard({
  className,
  classId,
  onClassAction,
}: {
  className: string;
  classId: number;
  onClassAction: (action: "edit" | "delete", classId: number) => void;
}) {

  return (
    <Card>
      <CardHeader>
        Class - {className}
        <CardAction className="flex flex-row gap-5">
          <EditDeleteOptions id={classId} onClick={onClassAction} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
