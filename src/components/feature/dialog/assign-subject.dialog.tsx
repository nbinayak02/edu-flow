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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sclass, Subject } from "@prisma/client";
import { BookPlus } from "lucide-react";
import { SubjectMultiSelect } from "../exam/subject-multiselect";
import { SetStateAction, useActionState, useEffect, useState } from "react";
import { AssignSubject, GetAllSubjectBySchool } from "@/app/_actions/subject";
import {
  AssignSubjectFormState,
  dialogEnum,
} from "@/app/(system)/subject/types";

export function AssignSubjectDialog({
  allClasses,
  dialogOpen,
  setDialogOpen,
}: {
  allClasses: Sclass[];
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<SetStateAction<dialogEnum | null>>;
}) {
  const [isSubjectLoading, setSubjectLoading] = useState<boolean>(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setSubjectLoading(true);
      const subjects = await GetAllSubjectBySchool();
      if (subjects) setSubjectList(subjects);
      setSubjectLoading(false);
    };
    fetch();
  }, []);

  const initialState: AssignSubjectFormState = {
    errors: {},
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    AssignSubject,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setDialogOpen(null);
    }
  }, [state]);

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Subject to Class</DialogTitle>
          <DialogDescription>
            Select subject to assign it to class.
          </DialogDescription>
        </DialogHeader>

        {state.errors.otherError && (
          <CardDescription className="text-rose-500">
            {state.errors.otherError}
          </CardDescription>
        )}

        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="sclass">Class</Label>

              <Select name="sclass">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Class</SelectLabel>
                    {allClasses.map((c, i) => (
                      <SelectItem key={i} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state.errors.sclass && (
                <CardDescription className="text-rose-500">
                  {state.errors.sclass}
                </CardDescription>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="subjects">Subjects</Label>

              <SubjectMultiSelect
                isLoading={isSubjectLoading}
                onReturn={(subjects: number[]) => setSelectedSubjects(subjects)}
                subjectList={subjectList}
              />

              <Input
                type="hidden"
                name="subjects"
                defaultValue={selectedSubjects.join(",")}
              />

              {state.errors.subjects && (
                <CardDescription className="text-rose-500">
                  {state.errors.subjects}
                </CardDescription>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="chour">Credit Hour</Label>
              <Input id="chour" name="creditHour" placeholder="Eg: 3.0" />
              {state.errors.credit_hour && (
                <CardDescription className="text-rose-500">
                  {state.errors.credit_hour}
                </CardDescription>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Assigning..." : "Assign"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
