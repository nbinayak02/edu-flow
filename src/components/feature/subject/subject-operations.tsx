"use client";
import { useState } from "react";
import { CreateSubjectDialog } from "../dialog/create-subject-dialog";
import { Subject } from "@/app/(system)/subject/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Class } from "@/app/(system)/class/types";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";

export default function SubjectOperations({
  initialSubjects,
  allClasses,
}: {
  initialSubjects: Subject[];
  allClasses: Class[];
}) {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  //get newly added subject data
  const handleGetSubjectData = (subjectData: Subject) => {
    setSubjects(() => [...subjects, subjectData]);
  };

  return (
    <>
      <CreateSubjectDialog
        onReturn={handleGetSubjectData}
        allClasses={allClasses}
      />
      <h3 className="text-2xl font-semibold my-5">All Subjects</h3>

      <Table className="border-2">
        <TableHeader className="bg-accent">
          <TableRow className="*:text-center">
            <TableHead>#</TableHead>
            <TableHead>Subject Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Credit Hour</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((s, i) => {
            return (
              <TableRow key={i} className="*:border-2 text-center">
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.sclass?.name}</TableCell>
                <TableCell>{s.credit_hour}</TableCell>
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
