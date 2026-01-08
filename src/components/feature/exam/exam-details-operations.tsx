"use client";

import { Class } from "@/app/(system)/class/types";
import { ConfigureExamDbType } from "@/app/(system)/exam/types";
import { AddSubjectMarksDialog } from "../dialog/exam-manage-addSubjects";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";

export default function ExamDetailsOperations({
  initialDetails,
  allClasses,
  examId,
}: {
  initialDetails: ConfigureExamDbType[];
  allClasses: Class[];
  examId: number;
}) {
  const [details, setDetails] =
    useState<Partial<ConfigureExamDbType>[]>(initialDetails);

  const handleGetExamDetails = (newDetails: Partial<ConfigureExamDbType>[]) => {
    if (newDetails.length > 0) setDetails(newDetails);
  };

  return (
    <>
      <AddSubjectMarksDialog
        allClasses={allClasses}
        examId={examId}
        onReturn={handleGetExamDetails}
      />
      <h3 className="text-2xl font-semibold my-5">Exam Details</h3>
      <Table className="border-2">
        <TableHeader className="bg-accent">
          <TableRow className="*:text-center ">
            <TableHead rowSpan={2}>#</TableHead>
            <TableHead rowSpan={2}>Class</TableHead>
            <TableHead rowSpan={2}>Subject</TableHead>
            <TableHead colSpan={2}>Theory</TableHead>
            <TableHead colSpan={2}>Practical</TableHead>
            <TableHead rowSpan={2}>Action</TableHead>
          </TableRow>
          <TableRow className="*:text-center">
            <TableHead>Full Marks</TableHead>
            <TableHead>Pass Marks</TableHead>
            <TableHead>Full Marks</TableHead>
            <TableHead>Pass Marks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.map((d, i) => {
            return (
              <TableRow key={i} className="*:border-2 *:text-center">
                <TableCell>{i + 1}</TableCell>
                <TableCell>{d.sclass?.name}</TableCell>
                <TableCell>{d.subject?.name}</TableCell>
                <TableCell>{d.thFullMarks}</TableCell>
                <TableCell>{d.thPassMarks}</TableCell>
                <TableCell>{d.prFullMarks}</TableCell>
                <TableCell>{d.prPassMarks}</TableCell>
                <TableCell>
                  <EditDeleteOptions />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
