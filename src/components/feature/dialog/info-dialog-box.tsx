import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import React, { SetStateAction } from "react";

export default function InfoDialogBox({
  title,
  message,
  open,
  setOpen,
  buttonLabel,
  loading,
  onContinue,
}: {
  title: string;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  loading: boolean;
  onContinue: (toContinue: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-4 items-center">
            <Info /> {title}
          </DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={loading} onClick={() => onContinue(true)}>
            {loading ? `${buttonLabel}ing...` : buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
