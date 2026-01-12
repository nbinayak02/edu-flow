"use client";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubjectMultiSelect } from "@/components/feature/exam/subject-multiselect";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { PlusCircle } from "lucide-react";
import { Class } from "@/app/(system)/class/types";
import { useActionState, useEffect, useState } from "react";
import { Subject } from "@/app/(system)/subject/types";
import { GetSubjectByClassAction } from "@/app/_actions/subject";
import {
  ConfigureExamDbType,
  ConfigureExamFormState,
} from "@/app/(system)/exam/types";
import { AddExamDetailsAction } from "@/app/_actions/exam";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddSubjectMarksDialog({
  allClasses,
  examId,
  onReturn,
}: {
  allClasses: Class[];
  examId: number;
  onReturn: (newDetails: Partial<ConfigureExamDbType>[]) => void;
}) {
  const [selectedClass, setSelectedClass] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const initialState: ConfigureExamFormState = {
    errors: {},
    data: [],
  };

  const [state, formAction, isPending] = useActionState(
    AddExamDetailsAction,
    initialState
  );

  //fetch subjects when class is selected

  useEffect(() => {
    if (selectedClass) {
      const fetch = async () => {
        setLoading(true);
        const subjects = await GetSubjectByClassAction(Number(selectedClass));
        if (subjects) setSubjectList(subjects);
        setLoading(false);
      };

      fetch();
    }
  }, [selectedClass]);

  useEffect(() => {
    // console.log("The state is: ", state);
    onReturn(state.data);
    if (Object.entries(state?.errors).length === 0) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={(a) => setOpen(a)}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Configure Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Exam</DialogTitle>
          <DialogDescription>
            Enter details of subjects, full marks and pass marks here. Click
            save when you&apos;re done.
          </DialogDescription>
          {state?.errors?.otherError && (
            <CardDescription className="bg-rose-500/60 border-2 border-rose-500 text-white font-semibold p-2 rounded-md">
              {state?.errors?.otherError}
            </CardDescription>
          )}
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-3">
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="sclass">Class</Label>
                <Select
                  onValueChange={(value) => setSelectedClass(value)}
                  disabled={loading}
                  name="classId"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classes</SelectLabel>
                      {allClasses.map((c: Class) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <CardDescription className="text-rose-500">
                  {/* {!state?.success && state?.error?.classId} */}
                </CardDescription>
              </div>
              <hr />
              <div className="grid gap-3">
                <Label htmlFor="subjects">Subjects</Label>
                <CardDescription>
                  Select all the subjects whose marks is equivalent to below
                  input value. You can input marks for remaining subjects by
                  opening this dialog box again and selecting the same class.
                </CardDescription>

                <SubjectMultiSelect
                  subjectList={subjectList}
                  isLoading={loading}
                  onReturn={(subjectIds) => setSelectedSubjects(subjectIds)}
                />
                <Input
                  type="hidden"
                  name="subjects"
                  value={selectedSubjects.join(",")}
                />
                <Input type="hidden" name="examId" value={examId} />
                <CardDescription className="text-rose-500">
                  {state?.errors?.subjects}
                </CardDescription>
              </div>

              <div>
                <Label>Theory</Label>
                <CardDescription>
                  Theory marks for above selected subjects.
                </CardDescription>
                <div className="grid grid-cols-2 gap-4 m-4">
                  <div className="grid gap-2">
                    <Label htmlFor="thfm">Full Marks</Label>
                    <Input id="thfm" name="thfm" placeholder="Eg: 75" />
                    <CardDescription className="text-rose-500">
                      {state?.errors?.thFm}
                    </CardDescription>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="thpm">Pass Marks</Label>
                    <Input id="thpm" name="thpm" placeholder="Eg: 25" />
                    <CardDescription className="text-rose-500">
                      {state.errors?.thPm}
                    </CardDescription>
                  </div>
                </div>
              </div>

              <div>
                <Label>Practical</Label>
                <CardDescription>
                  Practical marks for above selected subjects.
                </CardDescription>
                <div className="grid grid-cols-2 gap-4 m-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prfm">Full Marks</Label>
                    <Input id="prfm" name="prfm" placeholder="Eg: 25" />
                    <CardDescription className="text-rose-500">
                      {state.errors?.prFm}
                    </CardDescription>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prpm">Pass Marks</Label>
                    <Input id="prpm" name="prpm" placeholder="Eg: 8" />
                    <CardDescription className="text-rose-500">
                      {state.errors?.prPm}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Add Info
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
