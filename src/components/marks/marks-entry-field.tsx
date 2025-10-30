"use client";

import { MarksObject, SubjectSearchReturn } from "@/app/(system)/marks/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export default function MarksInputField({
  subject,
  onReturn,
}: {
  subject: SubjectSearchReturn;
  onReturn: (marksObj: MarksObject) => void;
}) {
  const [obj, setObj] = useState({
    subjectId: subject.id,
    theoryMarks: 0,
    practicalMarks: 0,
  });

  const handleDataChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObj((prev) => {
      const latest = {
        ...prev,
        [e.target.name === "theory" ? "theoryMarks" : "practicalMarks"]: Number(
          e.target.value
        ),
      };
      onReturn(latest);

      return latest;
    });
  };
  return (
    <div className="grid gap-3">
      <Label>{subject.name}</Label>
      <Input
        type="number"
        name="theory"
        placeholder="Theory Marks"
        onChange={(e) => handleDataChanged(e)}
      />
      <Input
        type="number"
        name="practical"
        placeholder="Practical Marks"
        onChange={(e) => handleDataChanged(e)}
      />
    </div>
  );
}
