"use client";

import { Class } from "@/app/(system)/class/types";
import SearchStudent from "../feature/student/search-student";

export default function ViewMarksOperation({
  allClasses,
}: {
  allClasses: Class[];
}) {

    const handleSuccess = () => {

    }
    
    return <>
    <SearchStudent classes={allClasses} onSuccess={handleSuccess} />
    </>
}
