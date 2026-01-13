"use client";
import { Student, StudentSearch } from "@/app/(system)/student/types";
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

import { CardDescription } from "@/components/ui/card";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sclass } from "@prisma/client";

export default function StudentOperations({
  initialStudents,
  allClasses,
}: {
  initialStudents: StudentSearch[];
  allClasses: Sclass[];
}) {
  const router = useRouter();
  return (
    <>
      <AddStudentDialog allClasses={allClasses} />
      <Button
        variant={"secondary"}
        className="ml-5 text-white bg-green-600 hover:bg-green-700"
        onClick={() => router.push("/student/view-all-students")}
      >
        View All Students <ArrowRight />
      </Button>
      <h3 className="text-2xl font-semibold my-5">
        New Students
        <CardDescription>Students who were recently added.</CardDescription>
      </h3>
      <Table className="border-2">
        <TableHeader>
          <TableRow className="bg-accent *:text-center *:border-2">
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Gurdian</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>IEMIS</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialStudents.map((s, i) => {
            return (
              <TableRow key={i} className="text-center *:border-2">
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  {s.enrollment ? s.enrollment[0]?.sclass?.name : ""}
                </TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell>{s.gurdian}</TableCell>
                <TableCell>
                  {s.enrollment ? s.enrollment[0]?.academicYear : ""}
                </TableCell>
                <TableCell>{s.iemis}</TableCell>
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
