"use client";
import { Class } from "@/app/(system)/class/types";
import { Subject, FormState } from "@/app/(system)/subject/types";
import { CreateNewSubjectAction } from "@/app/_actions/subject";
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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { PlusCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export function CreateSubjectDialog({
  onReturn,
  allClasses,
}: {
  onReturn: (subjectData: Subject) => void;
  allClasses: Class[];
}) {
  const initialState: FormState = {
    errors: {},
  };

  const [open, setOpen] = useState(false);
  const [classes, setClass] = useState<Class[]>(allClasses);

  const [state, formAction, isPending] = useActionState(
    CreateNewSubjectAction,
    initialState
  );

  useEffect(() => {
    if (state?.newSubject) {
      onReturn(state?.newSubject);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={(a) => setOpen(a)}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Create New Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Subject</DialogTitle>
          <DialogDescription>
            Enter details of new subject here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="sname">Subject Name</Label>
              <Input id="sname" name="name" />
              <CardDescription className="text-rose-500">
                {state?.errors?.name}
              </CardDescription>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sclass">Class</Label>

              <Select name="sclass">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Class</SelectLabel>
                    {classes.map((c, i) => (
                      <SelectItem key={i} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <CardDescription className="text-rose-500"></CardDescription>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="chour">Credit Hour</Label>
              <Input id="chour" name="creditHour" placeholder="Eg: 3.0" />
              <CardDescription className="text-rose-500">
                {state?.errors?.creditHour}
              </CardDescription>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
