"use client";

import { Class } from "@/app/(system)/class/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { Exam } from "@/app/(system)/exam/types";
import { GetExamByYearAction } from "@/app/_actions/exam";
import {
  StudentSearchFormState,
  StudentSearchReturn,
  SubjectSearchReturn,
} from "@/app/(system)/marks/types";
import { SearchStudentsAction } from "@/app/_actions/student";
import MarksInputForm from "./marks-input-form";

export default function MarksOperations({ classes }: { classes: Class[] }) {
  const [year, setYear] = useState<number>(0);
  const [exams, setExams] = useState<Exam[]>();
  const [classId, setClassId] = useState<number>(0);
  const [students, setStudents] = useState<StudentSearchReturn[]>([]);
  const [subjects, setSubjects] = useState<SubjectSearchReturn[]>([]);

  const initialState: StudentSearchFormState = {
    errors: {},
    data: {
      students: [],
      subjects: [],
    },
  };

  const [state, formAction, isPending] = useActionState(
    SearchStudentsAction,
    initialState
  );

  useEffect(() => {
    fetchExam();
  }, [year]);

  useEffect(() => {
    console.log("State is: ", state);
    setStudents(state?.data?.students);
    setSubjects(state?.data?.subjects);
  }, [state]);

  const fetchExam = async () => {
    const exams = await GetExamByYearAction(Number(year));
    setExams(exams);
  };
  return (
    <div>
      {state?.errors?.otherErrors && (
        <div className="bg-rose-500 border-2 border-rose-800 p-2 rounded-xl">
          {state?.errors?.otherErrors}
        </div>
      )}
      <Card className="w-fit mb-5">
        <CardHeader>
          <CardTitle>Search Students</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-row gap-5" action={formAction}>
            <div className="grid gap-3">
              <Label htmlFor="cname">Class</Label>
              <Select onValueChange={(value) => setClassId(Number(value))}>
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
              <input type="hidden" name="classId" value={String(classId)} />
              <CardDescription className="text-rose-500">
                {state.errors?.class}
              </CardDescription>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cname">Year</Label>
              <Select
                onValueChange={(selectedYear) => setYear(Number(selectedYear))}
                name="year"
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

            <div className="mt-6">
              <Button className="w-50" disabled={isPending}>
                {isPending ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* //render form */}
      <MarksInputForm classId={classId} students={students} subjects={subjects} exams={exams}/>
    </div>
  );
}
