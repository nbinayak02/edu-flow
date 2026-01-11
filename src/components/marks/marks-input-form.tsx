"use client";
import { Exam } from "@/app/(system)/exam/types";
import {
  MarksFormState,
  MarksObject,
  StudentSearchReturn,
  SubjectSearchReturn,
} from "@/app/(system)/marks/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useActionState, useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import MarksInputField from "./marks-entry-field";
import { AddMarks } from "@/app/_actions/marks";
import ErrorDialog from "../feature/dialog/error-dialog-box";
import SuccessDialog from "../feature/dialog/success-dialog-box";
import { Student } from "@/app/(system)/student/types";

export default function MarksInputForm({
  students,
  subjects,
  exams,
  classId,
}: {
  students: Student[];
  subjects: SubjectSearchReturn[];
  exams: Exam[] | undefined;
  classId: number;
}) {
  // student dropdown open/close tracking
  const [open, setOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [examId, setExamId] = useState<number>();

  const [selectedStudent, setSelectedStudent] = useState<String>("");
  const [marksObject, setMarksObject] = useState<MarksObject[]>([]);

  const handleMarksReturn = (marksObj: MarksObject) => {
    setMarksObject((prev) => {
      const index = prev.findIndex(
        (obj) => obj.subjectId === marksObj.subjectId
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = marksObj;
        return updated;
      }

      return [...prev, marksObj];
    });
  };

  const initialState: MarksFormState = {
    errors: {},
    message: "",
  };

  const [state, formAction, isPending] = useActionState(AddMarks, initialState);

  //intercepting form submission for some actions

  const interceptingFormAction = (formData: FormData) => {
    if (marksObject.length === subjects.length) {
      const payloadString = JSON.stringify(marksObject);
      formData.append("marks", payloadString);
      formAction(formData);
      setMarksObject([]);
    } else {
      state.errors.otherError = "Please input all marks.";
      setErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    if (state?.message === "Error") {
      setErrorDialogOpen(true);
    }
    if (state?.message === "Success") {
      setSuccessDialogOpen(true);
    }
  }, [state]);

  return (
    <>
      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={(dialogOpen) => setSuccessDialogOpen(dialogOpen)}
      />
      <ErrorDialog
        errors={state?.errors}
        open={errorDialogOpen}
        onOpenChange={(dialogOpen) => setErrorDialogOpen(dialogOpen)}
      />
      {students.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Marks Entry Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action={interceptingFormAction}
              className="flex flex-row justify-evenly gap-5"
            >
              {/* left side elements  */}
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="exam">Exam</Label>
                  <Select onValueChange={(value) => setExamId(Number(value))}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Exams</SelectLabel>
                        {exams &&
                          exams.map((e) => (
                            <SelectItem key={e.id} value={String(e.id)}>
                              {e.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="examId" defaultValue={examId} />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="exam">Student</Label>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        role="combobox"
                        aria-expanded={open}
                        className="w-[250px] justify-between"
                      >
                        {selectedStudent
                          ? selectedStudent
                          : "Select Student..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search student..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No students found.</CommandEmpty>
                          <CommandGroup>
                            {students.map((student) => (
                              <CommandItem
                                key={student.id}
                                value={student.name}
                                onSelect={(currentValue) => {
                                  setSelectedStudent(currentValue);
                                  setOpen(false);
                                }}
                              >
                                {student.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <input
                    type="hidden"
                    name="enrollmentId"
                    value={
                      students.find(
                        (student) => student.name === selectedStudent
                      )?.enrollment[0].id
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant={"outline"} type="reset" disabled={isPending}>
                    Reset Marks
                  </Button>
                  <Button
                    variant={"default"}
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save Marks"}
                  </Button>
                </div>
              </div>

              {/* right side elements  */}

              <div className="grid grid-cols-4 gap-8">
                {subjects &&
                  subjects.map((s) => (
                    <MarksInputField
                      subject={s}
                      key={s.id}
                      onReturn={handleMarksReturn}
                    />
                  ))}
              </div>

              <input type="hidden" name="sclassId" defaultValue={classId} />
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
