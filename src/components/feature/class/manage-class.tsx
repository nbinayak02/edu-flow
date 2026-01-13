"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sclass } from "@prisma/client";
import { PlusCircle } from "lucide-react";

export default function ManageClass({ sclass }: { sclass: Sclass }) {
  return (
    <section>
      <Button>
        <PlusCircle /> Add Subjects
      </Button>

      <h2 className="text-xl font-semibold my-5">Subjects</h2>
      <Table className="border-2">
        <TableHeader>
          <TableRow className="bg-accent *:text-center *:border-2">
            <TableHead>Roll Number</TableHead>
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
          {/* {students.map((s, i) => {
            return (
              <TableRow key={i} className="text-center *:border-2">
                <TableCell>{s.rollNumber}</TableCell>
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
          })} */}
        </TableBody>
      </Table>
    </section>
  );
}
