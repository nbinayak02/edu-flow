"use client";
import { useEffect, useState } from "react";
import { CreateSubjectDialog } from "../dialog/create-subject-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sclass } from "@prisma/client";
import { AssignSubjectDialog } from "../dialog/assign-subject.dialog";
import {
  SubjectAssignedWithClass,
  subjectDialogEnum,
  SubjectWithClassAssigned,
} from "@/app/(system)/subject/types";
import { Button } from "@/components/ui/button";
import { BookPlus, PlusCircle } from "lucide-react";
import SubjectActions from "./subject-actions";
import UpdateSubjectDialog from "../dialog/update-subject-dialog";

export default function SubjectOperations({
  subjects,
  allClasses,
}: {
  subjects: SubjectWithClassAssigned[];
  allClasses: Sclass[];
}) {
  const [subjectsData, setSubjectsData] =
    useState<SubjectWithClassAssigned[]>(subjects);

  const [activeDialog, setActiveDialog] = useState<subjectDialogEnum>(
    subjectDialogEnum.none,
  );

  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();

  useEffect(() => {
    console.log("Active Dialog: ", activeDialog);
  }, [activeDialog]);

  const handleAction = (action: subjectDialogEnum, id: number) => {
    console.log(action, id);
    switch (action) {
      case subjectDialogEnum.editSubject:
        setActiveDialog(subjectDialogEnum.editSubject);
        break;

      case subjectDialogEnum.editSubAssigned:
        setActiveDialog(subjectDialogEnum.editSubAssigned);
        break;

      default:
        break;
    }

    setSelectedSubjectId(id);
  };

  const handleUpdateSubjectSuccess = (success: boolean, data: unknown) => {
    if (success && data) {
      const updatedSubject = data as SubjectWithClassAssigned;
      setSubjectsData((prev) =>
        prev.map((s) => (s.id === updatedSubject.id ? updatedSubject : s)),
      );
    }
  };
  return (
    <>
      <CreateSubjectDialog
        dialogOpen={activeDialog === subjectDialogEnum.create}
        setDialogOpen={(isOpen) =>
          setActiveDialog(
            isOpen ? subjectDialogEnum.create : subjectDialogEnum.none,
          )
        }
      />
      <AssignSubjectDialog
        allClasses={allClasses}
        dialogOpen={activeDialog === subjectDialogEnum.assign}
        setDialogOpen={(isOpen) =>
          setActiveDialog(
            isOpen ? subjectDialogEnum.assign : subjectDialogEnum.none,
          )
        }
      />

      <div className="space-x-5">
        <Button
          onClick={() => {
            setActiveDialog(subjectDialogEnum.create);
          }}
        >
          <PlusCircle /> Create New Subject
        </Button>

        <Button
          onClick={() => {
            setActiveDialog(subjectDialogEnum.assign);
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
          {subjectsData.map((s, i) => {
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
                    ),
                  )}
                </TableCell>
                <TableCell>
                  <SubjectActions id={s.id} onClick={handleAction} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {activeDialog === subjectDialogEnum.editSubject && (
        <UpdateSubjectDialog
          open={activeDialog === subjectDialogEnum.editSubject}
          setOpen={(isOpen) =>
            setActiveDialog(
              isOpen ? subjectDialogEnum.editSubject : subjectDialogEnum.none,
            )
          }
          subjectDefaultValue={subjectsData.find(
            (s) => s.id === selectedSubjectId,
          )}
          isSuccess={handleUpdateSubjectSuccess}
        />
      )}
    </>
  );
}
