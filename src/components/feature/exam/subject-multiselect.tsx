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
import { Subject } from "@/app/(system)/subject/types";

export function SubjectMultiSelect({ subjects }: { subjects: Subject[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  const handleSelection = (currentValue: string) => {
    if (value.includes(currentValue)) {
      setValue((prevValue) => prevValue.filter((v) => v !== currentValue));
      return;
    }

    setValue((prevValue) => [...prevValue, currentValue]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[370px] justify-between"
        >
          {value.length > 0 ? (
            <p className="truncate">{value.join(", ")}</p>
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
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {subjects.map((subject) => (
                <CommandItem
                  key={subject.id}
                  value={String(subject.id)}
                  onSelect={(currentValue) => handleSelection(currentValue)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(subject.name) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {subject.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
