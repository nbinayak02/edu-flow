"use client";
import { Exam } from "@/app/(system)/exam/types";
import {
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
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export default function MarksInputForm({
  students,
  subjects,
  exams,
}: {
  students: StudentSearchReturn[];
  subjects: SubjectSearchReturn[];
  exams: Exam[] | undefined;
}) {
  // student dropdown open/close tracking
  const [open, setOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<String>("");

  return (
    <>
      {students.length > 0 && subjects.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Marks Entry Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-row justify-evenly gap-5">
              {/* left side elements  */}
              <div className="grid">
                <div className="grid gap-3">
                  <Label htmlFor="exam">Exam</Label>
                  <Select>
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
                  <input type="hidden" name="classId" />
                  <CardDescription className="text-rose-500"></CardDescription>
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
                    name="studentId"
                    value={
                      students.find(
                        (student) => student.name === selectedStudent
                      )?.id
                    }
                  />
                  <CardDescription className="text-rose-500"></CardDescription>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant={"outline"} type="reset">
                    Reset Marks
                  </Button>
                  <Button variant={"default"} type="submit">
                    Save Marks
                  </Button>
                </div>
              </div>

              {/* right side elements  */}
              <div className="grid grid-cols-4 gap-8">
                {subjects &&
                  subjects.map((s) => {
                    return (
                      <div className="grid gap-3" key={s.id}>
                        <Label>{s.name}</Label>
                        <Input type="number" placeholder="Theory Marks" />
                        <Input type="number" placeholder="Practical Marks" />
                      </div>
                    );
                  })}
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
