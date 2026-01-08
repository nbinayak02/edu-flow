"use client";
import { DeleteFormState } from "@/app/(system)/class/types";
import { DeleteClassAction } from "@/app/_actions/class";
import EditDeleteOptions from "@/components/custom-components/editDelOptions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Edit2, Ellipsis, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

export default function ClassCard({
  className,
  classId,
}: {
  className: string;
  classId: number;
}) {
  return (
    <Card>
      <CardHeader>
        Class {className}
        <CardAction>
          <EditDeleteOptions />
        </CardAction>
      </CardHeader>
      <CardContent className="flex justify-evenly">
        <CardDescription className="font-semibold">
          Students: 100
        </CardDescription>
        <CardDescription className="font-semibold">
          Subjects: 100
        </CardDescription>
      </CardContent>
    </Card>
  );
}
