"use client";
import { useState } from "react";
import { CreateSubjectDialog } from "../dialog/create-subject-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Sclass, Subject, SubjectAssigned } from "@prisma/client";
import { AssignSubjectDialog } from "../dialog/assign-subject.dialog";
import {
  dialogEnum,
  SubjectAssignedWithClass,
  SubjectWithClassAssigned,
} from "@/app/(system)/subject/types";
import { Button } from "@/components/ui/button";
import { BookPlus, PlusCircle } from "lucide-react";

export default function SubjectOperations({
  subjects,
  allClasses,
}: {
  subjects: SubjectWithClassAssigned[];
  allClasses: Sclass[];
}) {
  const [activeDialog, setActiveDialog] = useState<dialogEnum | null>(null);

  return (
    <>
      <CreateSubjectDialog
        dialogOpen={activeDialog === dialogEnum.create}
        setDialogOpen={setActiveDialog}
      />
      <AssignSubjectDialog
        allClasses={allClasses}
        dialogOpen={activeDialog === dialogEnum.assign}
        setDialogOpen={setActiveDialog}
      />

      <div className="space-x-5">
        <Button
          onClick={() => {
            setActiveDialog(dialogEnum.create);
          }}
        >
          <PlusCircle /> Create New Subject
        </Button>

        <Button
          onClick={() => {
            setActiveDialog(dialogEnum.assign);
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          <BookPlus />
          Assign Subjects
        </Button>
      </div>

      <h3 className="text-2xl font-semibold my-5">All Subjects</h3>

      <Table className="border-2">
        <TableHeader className="bg-accent">
          <TableRow className="*:text-center">
            <TableHead>#</TableHead>
            <TableHead>Subject Name</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((s, i) => {
            return (
              <TableRow key={i} className="*:border-2 text-center">
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  {s.subjectAssigned?.map(
                    (sa: SubjectAssignedWithClass, index: number) => (
                      <div className="space-x-5" key={index}>
                        <span>Class - {sa.sclass.name}</span>
                        <span>Credit Hour: {sa.credit_hour}</span>
                      </div>
                    )
                  )}
                </TableCell>
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
