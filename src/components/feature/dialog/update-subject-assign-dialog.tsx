import {
  handleAssignPayload,
  UpdateSubAssignFormState,
} from "@/app/(system)/subject/types";
import { UpdateSubjectAssigned } from "@/app/_actions/subject";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { SetStateAction, useActionState, useEffect } from "react";
import { Sclass } from "@prisma/client";
import ErrorBox from "@/components/custom-components/errorBox";

export default function UpdateSubjectAssignedDialog({
  data,
  allClasses,
  isSuccess,
  open,
  setOpen,
}: {
  data: handleAssignPayload | null;
  allClasses: Sclass[];
  isSuccess: (success: boolean) => void;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const initialState: UpdateSubAssignFormState = {
    errors: {},
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    UpdateSubjectAssigned,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      isSuccess(true);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Subject Assigned To</DialogTitle>
          <DialogDescription>
            Edit details of assignment here. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {state.errors.otherError && (
          <ErrorBox message={state.errors.otherError} />
        )}
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Subject: {data?.subjectName}</Label>
              <Input
                type="hidden"
                name="subjectId"
                defaultValue={data?.subjectId}
              />
              <Input
                type="hidden"
                name="classId"
                defaultValue={data?.classId}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="sclass">Class</Label>

              <Select name="sclass" defaultValue={String(data?.classId)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Class</SelectLabel>
                    {allClasses.map((c, i) => (
                      <SelectItem key={i} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state.errors.sclass && (
                <CardDescription className="text-rose-500">
                  {state.errors.sclass}
                </CardDescription>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="chour">Credit Hour</Label>
              <Input
                id="chour"
                name="creditHour"
                placeholder="Eg: 3.0"
                defaultValue={data?.credit_hour}
              />
              {state.errors.credit_hour && (
                <CardDescription className="text-rose-500">
                  {state.errors.credit_hour}
                </CardDescription>
              )}
            </div>
          </div>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  Updating
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
