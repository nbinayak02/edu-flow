"use client";
import { Student } from "@/app/(system)/student/types";
import { useState } from "react";
import { AddStudentDialog } from "../dialog/add-student-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Class } from "@/app/(system)/class/types";
import { CardDescription } from "@/components/ui/card";

export default function StudentOperations({
  initialStudents,
  allClasses,
}: {
  initialStudents: Student[];
  allClasses: Class[];
}) {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  //get newly added student data
  const handleGetStudentData = (studentData: Student) => {
    setStudents(() => [...students, studentData]);
  };

  return (
    <>
      <AddStudentDialog
        onReturn={handleGetStudentData}
        allClasses={allClasses}
      />
      <h3 className="text-2xl font-semibold my-5">
        New Students
        <CardDescription>Students who were recently added.</CardDescription>
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Gurdian</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>IEMIS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.sclass?.name}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell>{s.gurdian}</TableCell>
                <TableCell>{s.year}</TableCell>
                <TableCell>{s.iemis}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
