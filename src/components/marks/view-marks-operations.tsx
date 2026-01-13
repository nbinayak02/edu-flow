"use client";


import { Sclass } from "@prisma/client";
import SearchStudent from "../feature/student/search-student";

export default function ViewMarksOperation({
  allClasses,
}: {
  allClasses: Sclass[];
}) {

    const handleSuccess = () => {

    }
    
    return <>
    <SearchStudent classes={allClasses} onSuccess={handleSuccess} />
    </>
}
