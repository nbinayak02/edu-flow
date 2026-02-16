"use client";
import { Edit2, Edit3, Ellipsis, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { subjectDialogEnum } from "@/app/(system)/subject/types";

export default function SubjectActions({
  id,
  onClick,
}: {
  id: number;
  onClick: (type: subjectDialogEnum, id: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onClick(subjectDialogEnum.editSubject, id)}
        >
          <Edit2 />
          Edit Subject
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onClick(subjectDialogEnum.editSubAssigned, id)}
        >
          <Edit3 />
          Edit Subject Assigned
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          variant="destructive"
          onClick={() => onClick(subjectActionEnum.delete, id)}
        >
          <Trash2 />
          Delete
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
