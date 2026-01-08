"use client";

import { useState } from "react";
import { CreateClassDialog } from "../dialog/create-class-dialog";
import { Class } from "@/app/(system)/class/types";
import ClassCard from "./class-cards";

export default function ClassOperations({
  initialClasses,
}: {
  initialClasses: Class[];
}) {
  const [classes, setClasses] = useState<Class[]>(initialClasses);

  //get newly added classes data
  const handleGetClassData = (classData: Class) => {
    setClasses(() => [...classes, classData]);
  };

  const handleDelete = (classId: number) => {
    setClasses((prevClass) => prevClass.filter((c) => c.id != classId));
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
            // onReturn={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
