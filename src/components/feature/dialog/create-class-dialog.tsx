"use client";

import { FormState } from "@/app/(system)/class/types";
import { CreateNewClassAction } from "@/app/_actions/class";
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
import { Sclass } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export function CreateClassDialog({
  onReturn,
}: {
  onReturn: (classData: Sclass) => void;
}) {
  const initialState: FormState = {
    errors: {},
  };

  const [open, setOpen] = useState(false)

  const [state, formAction, isPending] = useActionState(
    CreateNewClassAction,
    initialState
  );

  useEffect(() => {
    // console.log("State changed, use effect running. State is: ", state);
    if (state?.newClass) {
      // console.log("Sending new class data to parent...");
      onReturn(state?.newClass);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open}  onOpenChange={(a) => setOpen(a)}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Create New Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Enter details of new class here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="cname">Class Name</Label>
              <Input id="cname" name="name" placeholder="Eg: 10" />
              <CardDescription className="text-rose-500">
                {state?.errors?.name}
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
