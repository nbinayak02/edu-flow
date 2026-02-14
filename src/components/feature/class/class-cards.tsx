"use client";

import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ClassCard({
  className,
  classId,
  onClassAction,
}: {
  className: string;
  classId: number;
  onClassAction: (action: "edit" | "delete", classId: number) => void;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        Class - {className}
        <CardAction className="flex flex-row gap-5">
          <EditDeleteOptions classId={classId} onClick={onClassAction} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
