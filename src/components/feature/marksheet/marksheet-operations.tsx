"use client";
import { Class } from "@/app/(system)/class/types";
import { Exam } from "@/app/(system)/exam/types";
import { Marksheet } from "@/app/(system)/marks/types";
import { MarksheetSearch } from "@/app/(system)/marksheet/types";
import { GetExamByYearAction } from "@/app/_actions/exam";
import { GetAllMarksheet } from "@/app/_actions/marksheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Printer } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import PrintMarksheet from "./print-marksheet-dialog";
import { PDFViewer } from "@react-pdf/renderer";
import PdfGenerator from "./marksheet-pdf-generator";
import GradesheetPDF from "./marksheet-pdf-generator";
import GradeSheet from "./marksheet-pdf-generator";

export default function MarksheetOperation({ classes }: { classes: Class[] }) {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [allMarksheet, setAllMarksheet] = useState<Marksheet[]>([]);
  const [printDialog, setPrintDialog] = useState<{
    open: boolean;
    data: Marksheet | undefined;
  }>();

  const initialState: MarksheetSearch = {
    errors: {},
    data: [],
  };

  const [state, formAction, isPending] = useActionState(
    GetAllMarksheet,
    initialState
  );

  useEffect(() => {
    if (selectedYear) {
      (async function () {
        const exams = await GetExamByYearAction(selectedYear);
        setAllExams(exams);
      })();
    }
  }, [selectedYear]);

  useEffect(() => {
    console.log(state);
    if (state.data) {
      setAllMarksheet(state.data);
    }
  }, [state]);

  const handlePrintClick = (marksheet: Marksheet) => {
    setPrintDialog({ open: true, data: marksheet });
  };

  return (
    <div>
      <Card className="w-fit mb-5">
        <CardHeader>
          <CardTitle>Search Marksheet</CardTitle>
        </CardHeader>
        <CardContent>
          {state?.errors?.otherErrors && (
            <div className="bg-rose-500 border-2 border-rose-800 p-2 rounded-xl">
              {state?.errors?.otherErrors}
            </div>
          )}
          <form className="flex flex-row gap-5" action={formAction}>
            <div className="grid gap-3">
              <Label htmlFor="cname">Class</Label>
              <Select name="sclassId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Classes</SelectLabel>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        Class {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input type="hidden" name="classId" />
              <CardDescription className="text-rose-500">
                {state.errors?.class}
              </CardDescription>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="cname">Year</Label>
              <Select
                name="year"
                onValueChange={(value) => setSelectedYear(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem value="2082">B.S. 2082</SelectItem>
                    <SelectItem value="2083">B.S. 2083</SelectItem>
                    <SelectItem value="2084">B.S. 2084</SelectItem>
                    <SelectItem value="2085">B.S. 2085</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <CardDescription className="text-rose-500">
                {state?.errors?.year}
              </CardDescription>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="cname">Exam</Label>
              <Select name="examId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select exam." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Exams</SelectLabel>
                    {allExams.map((e) => (
                      <SelectItem key={e.id} value={String(e.id)}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <CardDescription className="text-rose-500">
                {state.errors?.exam}
              </CardDescription>
            </div>

            <div className="mt-6">
              <Button disabled={isPending} className="w-50">
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {allMarksheet.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Marksheet</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMarksheet.map((marksheet) => (
                  <TableRow key={marksheet.id}>
                    <TableCell>{marksheet.student?.name}</TableCell>
                    <TableCell>{marksheet.sclass?.name}</TableCell>
                    <TableCell>{marksheet.exam?.name}</TableCell>
                    <TableCell className="font-bold">{marksheet.gpa}</TableCell>
                    <TableCell>
                      {new Date(marksheet?.updatedAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"outline"}
                        onClick={() => handlePrintClick(marksheet)}
                      >
                        <Printer /> Print Marksheet
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {printDialog && printDialog.open && (
        <PrintMarksheet
          open={printDialog.open}
          setOpenChange={setPrintDialog}
          marksheet={printDialog.data}
        />
      )}
    </div>
  );
}
