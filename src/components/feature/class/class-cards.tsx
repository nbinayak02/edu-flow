"use client";

import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ClassCard({
  className,
  classId,
}: {
  className: string;
  classId: number;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        Class - {className}
        <CardAction className="flex flex-row gap-5">
          {/* <Button onClick={() => router.push(`/class/${classId}/manage`)}>
            Manage
          </Button> */}
          <EditDeleteOptions />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
