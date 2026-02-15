"use client";

import { useState } from "react";
import { CreateClassDialog } from "../dialog/create-class-dialog";

import ClassCard from "./class-cards";
import { Sclass } from "@prisma/client";
import InfoDialogBox from "../dialog/info-dialog-box";
import { DeleteClassAction } from "@/app/_actions/class";
import { UpdateClassDialog } from "../dialog/update-class-dialog";

export default function ClassOperations({
  initialClasses,
}: {
  initialClasses: Sclass[];
}) {
  enum DIALOGS {
    NONE,
    EDIT,
    DELETE,
  }
  const [classes, setClasses] = useState<Sclass[]>(initialClasses);
  const [openDialog, setOpenDialog] = useState<DIALOGS>(DIALOGS.NONE);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //get newly added classes data
  const handleGetClassData = (classData: Sclass) => {
    setClasses(() => [...classes, classData]);
  };

  const handleClassAction = (action: "edit" | "delete", classId: number) => {
    switch (action) {
      case "delete":
        setOpenDialog(DIALOGS.DELETE);
        break;
      case "edit":
        setOpenDialog(DIALOGS.EDIT);
        break;
      default:
        setOpenDialog(DIALOGS.NONE);
        break;
    }
    setSelectedClassId(classId);
  };

  const handleDelete = async () => {
    setLoading(true);
    await DeleteClassAction(Number(selectedClassId));
    setClasses((prevClass) =>
      prevClass.filter((c) => c.id != Number(selectedClassId)),
    );
    setLoading(false);
    setOpenDialog(DIALOGS.NONE);
  };

  const handleUpdateSuccess = (success: boolean, data: Sclass | null) => {
    if (!data) return;
    const existingClassIndex = classes.findIndex((cls) => cls.id === data.id);
    if (existingClassIndex < 0) return;
    setClasses((prevClass) => {
      const updatedClasses = [...prevClass];
      updatedClasses[existingClassIndex] = data;
      return updatedClasses;
    });
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

      {openDialog === DIALOGS.DELETE && (
        <InfoDialogBox
          open={openDialog === DIALOGS.DELETE}
          setOpen={(isOpen) =>
            setOpenDialog(isOpen ? DIALOGS.DELETE : DIALOGS.NONE)
          }
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

      {openDialog === DIALOGS.EDIT && (
        <UpdateClassDialog
          open={openDialog === DIALOGS.EDIT}
          setOpen={(isOpen) =>
            setOpenDialog(isOpen ? DIALOGS.EDIT : DIALOGS.NONE)
          }
          defaultValue={classes.find((cls) => cls.id === selectedClassId)}
          isSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
}
