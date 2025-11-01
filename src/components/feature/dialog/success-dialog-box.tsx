import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheckBig } from "lucide-react";

export default function SuccessDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (dialogOpen: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <CircleCheckBig className="inline text-green-500 mr-3" />
            Success
          </DialogTitle>
        </DialogHeader>
        <p>The operation has been successfully completed.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Okay</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
