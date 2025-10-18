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
import { useEffect, useState } from "react";
import { Subject } from "@/app/(system)/subject/types";

export function AddSubjectMarksDialog({
  allClasses,
  onReturn,
}: {
  allClasses: Class[];
  onReturn: (classId: string) => Promise<Subject[]>;
}) {
  const [selectedClass, setSelectedClass] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>();

  useEffect(() => {
    if (selectedClass) {
      const fetch = async () => {
        setLoading(true);
        const result = await onReturn(selectedClass);
        setSubjects(result);
        setLoading(false);
      };
      fetch();
    }
  }, [selectedClass]);

  return (
    <Dialog>
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
        </DialogHeader>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="sclass">Class</Label>
              <Select onValueChange={(value) => setSelectedClass(value)}>
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
            </div>
            <hr />
            <div className="grid gap-3">
              <Label htmlFor="subjects">Subjects</Label>
              <CardDescription>Select one or more subjects.</CardDescription>
              {loading ? (
                "Loading subjects... Please wait!"
              ) : (
                <></>
                // <SubjectMultiSelect subjects={subjects} />
              )}
              <CardDescription className="text-rose-500"></CardDescription>
            </div>

            <div>
              <Label>Theory</Label>
              <div className="grid grid-cols-2 gap-4 m-4">
                <div className="grid gap-2">
                  <Label htmlFor="thfm">Full Marks</Label>
                  <Input id="thfm" name="thfm" placeholder="Eg: 75" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thpm">Pass Marks</Label>
                  <Input id="thpm" name="thpm" placeholder="Eg: 25" />
                </div>
              </div>
            </div>

            <div>
              <Label>Practical</Label>
              <div className="grid grid-cols-2 gap-4 m-4">
                <div className="grid gap-2">
                  <Label htmlFor="thfm">Full Marks</Label>
                  <Input id="thfm" name="thfm" placeholder="Eg: 25" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thpm">Pass Marks</Label>
                  <Input id="thpm" name="thpm" placeholder="Eg: 8" />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Info</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
