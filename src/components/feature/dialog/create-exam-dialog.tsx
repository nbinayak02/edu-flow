"use client";

import { Exam, FormState } from "@/app/(system)/exam/types";
import { CreateExamAction } from "@/app/_actions/exam";
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

import { PlusCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export function CreateExamDialog() {
  const initialState: FormState = {
    errors: {},
    status: false,
  };

  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    CreateExamAction,
    initialState
  );

  useEffect(() => {
    if (state.status) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={(a) => setOpen(a)}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Create Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Exam</DialogTitle>
          <DialogDescription>
            Enter details of exam here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="ename">Exam Name</Label>
              <Input
                id="ename"
                name="name"
                placeholder="E.g: First Terminal Examination"
              />
              <CardDescription className="text-rose-500">
                {state?.errors?.name}
              </CardDescription>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="eyear">Exam year</Label>
              <Input id="eyear" name="year" placeholder="E.g: 2082" />
              <CardDescription className="text-rose-500">
                {state?.errors?.year}
              </CardDescription>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="rdate">Result Date</Label>
              <Input id="rdate" name="rdate" placeholder="E.g: 2082-01-01" />
              <CardDescription>
                Resut Date is Optional, can be updated later.
              </CardDescription>
              <CardDescription className="text-rose-500">
                {state?.errors?.year}
              </CardDescription>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
