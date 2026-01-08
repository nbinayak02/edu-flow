"use client";

import { Class } from "@/app/(system)/class/types";
import { FormState, Student } from "@/app/(system)/student/types";
import { AddStudentAction } from "@/app/_actions/student";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export function AddStudentDialog({ allClasses }: { allClasses: Class[] }) {
  const initialState: FormState = {
    errors: {},
    success: false,
  };

  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    AddStudentAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={(a) => setOpen(a)}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Add New Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter details of new student here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-3">
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="class">Class</Label>
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
                <CardDescription className="text-rose-500"></CardDescription>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="sname">Full Name</Label>
                <Input id="sname" name="name" />
                <CardDescription className="text-rose-500">
                  {state?.errors?.name}
                </CardDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="addr">Address</Label>
                <Input id="addr" name="address" />
                <CardDescription className="text-rose-500">
                  {state?.errors?.address}
                </CardDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" name="contact" />
                <CardDescription className="text-rose-500">
                  {state?.errors?.contact}
                </CardDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="gname">Gurdian Name</Label>
                <Input id="gname" name="gurdian" />
                <CardDescription className="text-rose-500">
                  {state?.errors?.gurdian}
                </CardDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="year">Academic Year</Label>
                <Select name="year">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Class</SelectLabel>
                      <SelectItem value="2082">2082</SelectItem>
                      <SelectItem value="2083">2083</SelectItem>
                      <SelectItem value="2084">2084</SelectItem>
                      <SelectItem value="2085">2085</SelectItem>
                      <SelectItem value="2086">2086</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <CardDescription className="text-rose-500">
                  {state?.errors?.year}
                </CardDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="iemis">IEMIS</Label>
                <Input id="iemis" name="iemis" />
                <CardDescription className="text-rose-500">
                  {state?.errors?.iemis}
                </CardDescription>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add Student"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
