import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info, Loader2, TriangleAlert } from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";

export default function InfoDialogBox({
  title,
  description,
  message,
  open,
  setOpen,
  buttonLabel,
  loading,
  onContinue,
  setTimer,
  timer = 0,
  variant = "info",
}: {
  title: string;
  description?: string;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  loading: boolean;
  onContinue: (toContinue: boolean) => void;
  setTimer?: boolean;
  timer?: number;
  variant?: "destructive" | "info";
}) {
  const [counter, setCounter] = useState(timer);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (setTimer) {
      interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      if (counter <= 0) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [counter, timer]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-4 items-center">
            {variant === "destructive" ? (
              <TriangleAlert className="text-destructive" />
            ) : (
              <Info />
            )}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={loading || counter > 0}
            onClick={() => onContinue(true)}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              `${buttonLabel} ${counter > 0 ? `(${counter})` : ""}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
