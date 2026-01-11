"use client";
import { Class } from "@/app/(system)/class/types";
import {
  StudentSearchFormState,
  StudentSearchReturn,
} from "@/app/(system)/marks/types";
import { Student, StudentSearch } from "@/app/(system)/student/types";
import { SearchStudentsAction } from "@/app/_actions/student";
import ErrorBox from "@/components/custom-components/errorBox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useActionState, useEffect, useState } from "react";

export default function SearchStudent({
  classes,
  onSuccess,
}: {
  classes: Class[];
  onSuccess: (
    students: StudentSearch[],
    selectedClass: number,
    selectedYear: number
  ) => void;
}) {
  const initialState: StudentSearchFormState = {
    success: false,
  };

  const [classId, setClassId] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const [state, formAction, isPending] = useActionState(
    SearchStudentsAction,
    initialState
  );

  useEffect(() => {
    // console.log("State: ", state);
    if (state.success && state.data) {
      onSuccess(state.data, classId, year);
    }
  }, [state]);

  return (
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
      {state.errors?.otherErrors && (
        <CardFooter>
          <ErrorBox />
        </CardFooter>
      )}
    </Card>
  );
}
