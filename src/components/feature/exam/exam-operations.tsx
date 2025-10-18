"use client";

import { Exam } from "@/app/(system)/exam/types";
import { CreateExamDialog } from "../dialog/create-exam-dialog";
import { useState } from "react";
import ExamCard from "./exam-cards";

export default function ExamOperations({
  initialExams,
}: {
  initialExams: Exam[];
}) {
  const [exam, setExam] = useState<Exam[]>(initialExams);
  const handleCreateExam = (examData: Exam) => {
    setExam(() => [...exam, examData]);
  };
  return (
    <>
      <CreateExamDialog onReturn={handleCreateExam} />
      <h3 className="text-2xl font-semibold my-5">Recent Exams</h3>
      <div className="grid grid-cols-3 gap-4">
        {exam.map((e, i) => (
          <ExamCard
            key={i}
            examName={e.name}
            examYear={e.year}
            examId={Number(e.id)}
          />
        ))}
      </div>
    </>
  );
}
