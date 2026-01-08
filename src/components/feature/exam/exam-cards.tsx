"use client";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function ExamCard({
  examName,
  examYear,
  examId,
}: {
  examName: string;
  examYear: number;
  examId: number;
}) {
  return (
    <Card>
      <CardHeader>
        {examName} - {examYear}
        <CardAction className="flex flex-row gap-5">
          <Link
            href={{
              pathname: `/exam/${examId}/manage`,
              query: { exam: examName, year: examYear },
            }}
          >
            <Button className="cursor-pointer">Manage</Button>
          </Link>
          <EditDeleteOptions />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
