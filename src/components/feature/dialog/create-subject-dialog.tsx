"use client";

import { dialogEnum, FormState } from "@/app/(system)/subject/types";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { SetStateAction, useActionState, useEffect } from "react";

export function CreateSubjectDialog({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<SetStateAction<dialogEnum | null>>;
}) {
  const router = useRouter();
  const initialState: FormState = {
    errors: {},
    data: null,
  };

  const [state, formAction, isPending] = useActionState(
    CreateNewSubjectAction,
    initialState
  );

  useEffect(() => {
    if (state?.data) {
      setDialogOpen(null);
      router.refresh()
    }
  }, [state]);

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(null)}>
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
