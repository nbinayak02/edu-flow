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

export function MultiSelect({
  list,
  label,
  isLoading,
  onReturn,
  defaultValue,
}: {
  list: any[];
  label: string;
  isLoading: boolean;
  onReturn: (selectedValues: number[]) => void;
  defaultValue?: number[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number[]>(defaultValue ?? []);

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
              {list
                .map((l) =>
                  l.id ? (value.includes(l.id) ? l.name : null) : null,
                )
                .join(" ")}
            </p>
          ) : (
            `Select ${label}...`
          )}

          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label}`} />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading... Please wait!" : `No ${label} found.`}
            </CommandEmpty>
            {isLoading ? (
              <></>
            ) : (
              <CommandGroup>
                {list.map((l) => (
                  <CommandItem
                    key={l.id}
                    value={String(l.id)}
                    onSelect={(currentValue) =>
                      handleSelection(Number(currentValue))
                    }
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(l.id ?? NaN)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {l.name}
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
