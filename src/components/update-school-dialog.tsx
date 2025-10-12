import { School } from "@/app/(system)/school/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

type UpdateDialogProps = {
  schoolData: Partial<School> | School;
};
export function UpdateDialog({ schoolData }: UpdateDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link">
            <Edit />
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update School Information</DialogTitle>
            <DialogDescription>
              Make changes to your school here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="sname">School Name</Label>
              <Input id="sname" name="name" defaultValue={schoolData?.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                defaultValue={schoolData?.address}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue={schoolData?.email} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                name="contact"
                defaultValue={schoolData?.contact}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="iemis">IEMIS Number</Label>
              <Input id="iemis" name="iemis" defaultValue={schoolData?.iemis} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="estd">Eastablished Year</Label>
              <Input id="estd" name="estd" defaultValue={schoolData?.estd} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
