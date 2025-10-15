"use client";
import { DeleteFormState } from "@/app/(system)/class/types";
import { DeleteClassAction } from "@/app/_actions/class";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";

export default function ClassCard({
  className,
  classId,
  onReturn,
}: {
  className: string;
  classId: number;
  onReturn: (classId: number) => void;
}) {
  const initialDeleteState: DeleteFormState = {
    message: {},
  };

  const [mouseOver, setMouseOver] = useState(false);
  const [deleteState, formDeleteAction, isDeletePending] = useActionState(
    DeleteClassAction,
    initialDeleteState
  );
  return (
    <Card
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <CardHeader>
        Class {className}
        <CardAction className="space-x-3">
          <form>
            <input type="hidden" value={classId} />
            <Button
              type="submit"
              variant={"outline"}
              className={`${mouseOver ? `inline-flex` : `hidden`}`}
            >
              Edit
            </Button>
          </form>
          <form action={formDeleteAction}>
            <Input type="hidden" name="id" value={classId} defaultValue={classId}/>
            <Button
              type="submit"
              variant={"destructive"}
              className={`${mouseOver ? `inline-flex` : `hidden`}`}
            >
              Delete
            </Button>
          </form>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
