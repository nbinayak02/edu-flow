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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead colSpan={2}>Full Marks</TableHead>
            <TableHead colSpan={2}>Pass Marks</TableHead>
          </TableRow>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>TH</TableHead>
            <TableHead>PR</TableHead>
            <TableHead>TH</TableHead>
            <TableHead>PR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.map((d, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{d.sclass?.name}</TableCell>
                <TableCell>{d.subject?.name}</TableCell>
                <TableCell>{d.thFullMarks}</TableCell>
                <TableCell>{d.prFullMarks}</TableCell>
                <TableCell>{d.thPassMarks}</TableCell>
                <TableCell>{d.prPassMarks}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
