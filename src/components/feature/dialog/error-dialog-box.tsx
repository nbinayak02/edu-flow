import { MarksError } from "@/app/(system)/marks/types";
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
import { TriangleAlert } from "lucide-react";

export default function ErrorDialog({
  errors,
  open,
  onOpenChange,
}: {
  errors: MarksError;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <TriangleAlert className="inline text-rose-500 mr-3" />
            Validation Error
          </DialogTitle>
          <DialogDescription>
            Please fix the following issues to continue.
          </DialogDescription>
        </DialogHeader>
        <ol>
          {Object.keys(errors).map((key) => {
            const k = key as keyof MarksError;
            return <li key={String(k)}>{errors[k]}</li>;
          })}
        </ol>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
