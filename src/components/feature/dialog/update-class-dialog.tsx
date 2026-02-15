"use client";

import { FormState } from "@/app/(system)/class/types";
import { CreateNewClassAction, UpdateClassAction } from "@/app/_actions/class";
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
import { Edit, Loader, Loader2, PlusCircle } from "lucide-react";
import { SetStateAction, useActionState, useEffect, useState } from "react";

export function UpdateClassDialog({
  defaultValue,
  isSuccess,
  open,
  setOpen,
}: {
  defaultValue: Sclass | undefined;
  isSuccess: (success: boolean, data: Sclass | null) => void;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const initialState: FormState = {
    errors: {},
    success: false,
    data: null,
  };

  const [state, formAction, isPending] = useActionState(
    UpdateClassAction,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.data) {
      isSuccess(true, state.data);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Class</DialogTitle>
          <DialogDescription>
            Edit details of class here. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="cname">Class Name</Label>
              <Input
                id="cname"
                name="name"
                placeholder="Eg: 10"
                defaultValue={defaultValue?.name}
              />
              <Input
                type="hidden"
                name="classId"
                defaultValue={defaultValue?.id}
              />
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
              {isPending ? (
                <>
                  Updating
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
