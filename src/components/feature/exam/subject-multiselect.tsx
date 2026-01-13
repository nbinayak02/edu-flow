"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Subject } from "@prisma/client";

export function SubjectMultiSelect({
  subjectList,
  isLoading,
  onReturn,
}: {
  subjectList: Subject[];
  isLoading: boolean;
  onReturn: (subjects: number[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number[]>([]);

  const handleSelection = (currentValue: number) => {
    if (value.includes(currentValue)) {
      setValue((prevValue) => prevValue.filter((v) => v !== currentValue));
      return;
    }

    setValue((prevValue) => [...prevValue, currentValue]);
  };

  // clear previous values if loading
  React.useEffect(() => {
    if (isLoading) setValue([]);
  }, [isLoading]);

  //send value to parent form
  React.useEffect(() => {
    onReturn(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[370px] justify-between"
        >
          {!isLoading && value.length > 0 ? (
            <p className="truncate">
              {subjectList
                .map((subject) =>
                  subject.id
                    ? value.includes(subject.id)
                      ? subject.name
                      : null
                    : null
                )
                .join(" ")}
            </p>
          ) : (
            "Select subject..."
          )}

          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading... Please wait!" : "No subjects found."}
            </CommandEmpty>
            {isLoading ? (
              <></>
            ) : (
              <CommandGroup>
                {subjectList.map((subject) => (
                  <CommandItem
                    key={subject.id}
                    value={String(subject.id)}
                    onSelect={(currentValue) =>
                      handleSelection(Number(currentValue))
                    }
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(subject.id ?? NaN)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {subject.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
