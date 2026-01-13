"use client";
import { FormState } from "@/app/(system)/school/types";
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
import { School } from "@prisma/client";
import { Edit } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";

type UpdateDialogProps = {
  schoolData: Partial<School> | School | null | undefined;
};
export function UpdateDialog({ schoolData }: UpdateDialogProps) {
  const initialState: FormState = {
    errors: {},
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    UpdateSchoolAction,
    initialState
  );

  const [uploadedImage, setUploadedImage] = useState<File>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const interceptSubmit = async (formData: FormData) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (uploadPreset && cloudName && uploadedImage) {
      const imageUploadFormData = new FormData();
      imageUploadFormData.append("file", uploadedImage);
      imageUploadFormData.append("upload_preset", uploadPreset);

      // make api call
      const response = await uploadImage(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageUploadFormData
      );

      // append image public_id to original form
      formData.append("logo_public_id", response.public_id);
    }

    // call server action
    startTransition(async () => {
      formAction(formData);
    });
  };

  const uploadImage = async (url: string, formData: FormData) => {
    try {
      setUploading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.log("Error on uploadImage: ", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <form action={interceptSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="logo">School Logo </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files && target.files[0]) {
                      setUploadedImage(target.files[0]);
                    }
                  }}
                />
                {uploadedImage && (
                  <img src={URL.createObjectURL(uploadedImage)} />
                )}
              </div>
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
                <Button variant="outline" disabled={isPending || uploading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || uploading}>
                {uploading
                  ? "Uploading Image..."
                  : isPending
                  ? "Saving Changes..."
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
