"use client";
import { Class } from "@/app/(system)/class/types";
import SearchStudent from "./search-student";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Info, StudentSearch } from "@/app/(system)/student/types";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { AssignRollNumbers } from "@/app/_actions/student";
import InfoDialogBox from "../dialog/info-dialog-box";
import { useRouter } from "next/navigation";

export default function ViewAllStudentsOperation({
  allClasses,
}: {
  allClasses: Class[];
}) {
  const [students, setStudents] = useState<StudentSearch[]>([]);
  const [info, setInfo] = useState<Info>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSearchSuccess = (
    students: StudentSearch[],
    selectedClass: number,
    selectedYear: number
  ) => {
    setStudents(students);
    setInfo({ selectedClass, selectedYear });
  };

  const handleAssignRollNumber = async () => {
    setLoading(true);
    const status = await AssignRollNumbers(
      info?.selectedClass,
      info?.selectedYear
    );
    setIsSuccess(status);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  }, [isSuccess]);

  return (
    <>
      <SearchStudent classes={allClasses} onSuccess={handleSearchSuccess} />
      {open && (
        <InfoDialogBox
          open={open}
          setOpen={setOpen}
          title="Assign Roll Numbers"
          message="The roll numbers will be assigned automatically based on alphabetical order of student's name. Do you want to continue?"
          buttonLabel="Assign"
          loading={loading}
          onContinue={handleAssignRollNumber}
        />
      )}

      {students.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">
            {info?.selectedClass && (
              <span>
                Students of Class{" "}
                {allClasses.find((c) => c.id === info.selectedClass)?.name} (
                {info?.selectedYear})
              </span>
            )}
          </h2>
          <div className="m-4 flex flex-row gap-5">
            <Button variant={"outline"} onClick={() => setOpen(true)}>
              Assign Roll Numbers
            </Button>
            <Button variant={"outline"}>
              <Printer /> Print
            </Button>
            <Button variant={"outline"}>
              <Download /> Export (.xlsx)
            </Button>
          </div>
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
              {students.map((s, i) => {
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
              })}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
