"use client";
import { Marksheet } from "@/app/(system)/marks/types";
import { School } from "@/app/(system)/school/types";
import { GetSchoolDetails } from "@/app/_actions/school";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserContext } from "@/context/user-context";
import { Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PdfGenerator from "./marksheet-pdf-generator";
import { useReactToPrint } from "react-to-print";
import GradeSheet from "./marksheet-pdf-generator";

export default function PrintMarksheet({
  marksheet,
  setOpenChange,
  open,
}: {
  marksheet: Marksheet | undefined;
  setOpenChange: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      data: Marksheet | undefined;
    }>
  >;
  open: boolean;
}) {
  const [schoolDetails, setSchoolDetails] = useState<School>();
  const { userId } = useUserContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({ contentRef });

  useEffect(() => {
    fetchRequiredData();
  }, []);

  useEffect(() => {
    console.log("School: ", schoolDetails);
    console.log("Marksheet: ", marksheet);
  }, [schoolDetails]);

  const fetchRequiredData = async () => {
    if (!userId) {
      console.log("User id not found");
      return;
    }
    const data = await GetSchoolDetails(userId);
    if (data) {
      setSchoolDetails(data);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(a) => setOpenChange({ open: a, data: undefined })}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Printer /> Print Marksheet
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Print Marksheet</DialogTitle>
          <DialogDescription>
            You can print or download the marksheet.
          </DialogDescription>
        </DialogHeader>
        <CardTitle>Preview</CardTitle>
        {schoolDetails && marksheet && (
          <div className="w-full h-120 overflow-auto">
            <GradeSheet
              ref={contentRef}
              school={schoolDetails}
              marksheet={marksheet}
            />
          </div>
        )}
        <Button className="w-fit" onClick={reactToPrint}>
          Print
        </Button>
      </DialogContent>
    </Dialog>
  );
}
