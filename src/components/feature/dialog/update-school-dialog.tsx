"use client";
import { FormState, School } from "@/app/(system)/school/types";
import { UpdateSchoolAction } from "@/app/_actions/school";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit } from "lucide-react";
import { useActionState } from "react";

type UpdateDialogProps = {
  schoolData: Partial<School> | School;
};
export function UpdateDialog({ schoolData }: UpdateDialogProps) {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    UpdateSchoolAction,
    initialState
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <Edit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Update School Information</DialogTitle>
          <DialogDescription>
            Make changes to your school here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-3">
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="sname">School Name</Label>
                <Input id="sname" name="name" defaultValue={schoolData?.name} />
                <DialogDescription className="text-rose-500">
                  {state.errors?.name}
                </DialogDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={schoolData?.address}
                />
                <DialogDescription className="text-rose-500">
                  {state.errors?.address}
                </DialogDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={schoolData?.email}
                />
                <DialogDescription className="text-rose-500">
                  {state.errors?.email}
                </DialogDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  name="contact"
                  defaultValue={schoolData?.contact}
                />
                <DialogDescription className="text-rose-500">
                  {state.errors?.contact}
                </DialogDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="iemis">IEMIS Number</Label>
                <Input
                  id="iemis"
                  name="iemis"
                  defaultValue={schoolData?.iemis}
                />
                <DialogDescription className="text-rose-500">
                  {state.errors?.iemis}
                </DialogDescription>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="estd">Eastablished Year</Label>
                <Input id="estd" name="estd" defaultValue={schoolData?.estd} />
                <DialogDescription className="text-rose-500">
                  {state.errors?.estd}
                </DialogDescription>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
