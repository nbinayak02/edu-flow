"use client";

import { Exam } from "@/app/(system)/exam/types";
import { CreateExamDialog } from "../dialog/create-exam-dialog";
import ExamCard from "./exam-cards";

export default function ExamOperations({
  initialExams,
}: {
  initialExams: Exam[];
}) {
  return (
    <>
      <CreateExamDialog />
      <h3 className="text-2xl font-semibold my-5">Recent Exams</h3>
      <div className="grid grid-cols-3 gap-4">
        {initialExams.map((e, i) => (
          <ExamCard
            key={i}
            examName={e.name}
            examYear={e.academicYear}
            examId={Number(e.id)}
          />
        ))}
      </div>
    </>
  );
}
