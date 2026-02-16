import {
  SubjectWithClassAssigned,
  UpdateSubjectFormState,
} from "@/app/(system)/subject/types";
import { UpdateSubject } from "@/app/_actions/subject";
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
import { Loader2 } from "lucide-react";
import { SetStateAction, useActionState, useEffect } from "react";

export default function UpdateSubjectDialog({
  subjectDefaultValue,
  isSuccess,
  open,
  setOpen,
}: {
  subjectDefaultValue: SubjectWithClassAssigned | undefined;
  isSuccess: (success: boolean, data: unknown) => void;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const initialState: UpdateSubjectFormState = {
    errors: {},
    success: false,
    data: null,
  };

  const [state, formAction, isPending] = useActionState(
    UpdateSubject,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.data) {
      isSuccess(true, state.data);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Subject</DialogTitle>
          <DialogDescription>
            Edit details of subject here. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="sname">Subject Name</Label>
              <Input
                id="sname"
                name="name"
                defaultValue={subjectDefaultValue?.name}
              />
              <CardDescription className="text-rose-500">
                {state?.errors?.name}
              </CardDescription>
              <Input
                type="hidden"
                name="id"
                defaultValue={subjectDefaultValue?.id}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
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
