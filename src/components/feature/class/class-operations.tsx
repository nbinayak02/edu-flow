"use client";

import { useState } from "react";
import { CreateClassDialog } from "../dialog/create-class-dialog";

import ClassCard from "./class-cards";
import { Sclass } from "@prisma/client";
import InfoDialogBox from "../dialog/info-dialog-box";
import { DeleteClassAction } from "@/app/_actions/class";

export default function ClassOperations({
  initialClasses,
}: {
  initialClasses: Sclass[];
}) {
  const [classes, setClasses] = useState<Sclass[]>(initialClasses);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //get newly added classes data
  const handleGetClassData = (classData: Sclass) => {
    setClasses(() => [...classes, classData]);
  };
  
  const handleClassAction = (action: "edit" | "delete", classId: number) => {
    switch (action) {
      case "delete":
        setOpen(true);
        setSelectedClassId(classId);
        break;
      case "edit":
        // Handle edit action here (e.g., open an edit dialog)
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await DeleteClassAction(Number(selectedClassId));
    setClasses((prevClass) =>
      prevClass.filter((c) => c.id != Number(selectedClassId)),
    );
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <CreateClassDialog onReturn={handleGetClassData} />
      <h3 className="text-2xl font-semibold my-5">All Classes</h3>

      <div className="grid grid-cols-3 gap-5">
        {classes.map((c, i) => (
          <ClassCard
            key={i}
            className={c.name}
            classId={Number(c.id)}
            onClassAction={handleClassAction}
          />
        ))}
      </div>

      {open && (
        <InfoDialogBox
          open={open}
          setOpen={setOpen}
          title="Delete?"
          description="This action cannot be undone."
          message="This will delete all the data related to this class, including students, teachers, and subjects. Are you sure you want to continue?"
          buttonLabel="Delete"
          loading={loading}
          onContinue={handleDelete}
          setTimer={true}
          timer={10}
          variant="destructive"
        />
      )}
    </>
  );
}
