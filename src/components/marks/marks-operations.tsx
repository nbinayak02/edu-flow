"use client";

import { Class } from "@/app/(system)/class/types";

import { useEffect, useState } from "react";
import { Exam } from "@/app/(system)/exam/types";
import { GetExamByYearAction } from "@/app/_actions/exam";

import MarksInputForm from "./marks-input-form";
import SearchStudent from "../feature/student/search-student";
import { GetSubjectByClassAction } from "@/app/_actions/subject";
import { Student } from "@/app/(system)/student/types";
import { Subject } from "@/app/(system)/subject/types";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MarksOperations({
  classes = [],
}: {
  classes: Class[];
}) {
  const [exams, setExams] = useState<Exam[]>();
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classId, setClassId] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const router = useRouter();

  const handleSearchStudent = (
    students: Student[],
    selectedClass: number,
    selectedYear: number
  ) => {
    // console.log("Students: ", students);
    setStudents(students);
    setClassId(selectedClass);
    setYear(selectedYear);
  };

  useEffect(() => {
    fetchExam();
    fetchSubject();
  }, [year]);

  const fetchExam = async () => {
    const exams = await GetExamByYearAction(Number(year));
    setExams(exams);
  };

  const fetchSubject = async () => {
    const subjects = await GetSubjectByClassAction(Number(classId));
    if (subjects) setSubjects(subjects);
  };

  return (
    <div>
      {/* <Button
        className="mb-5 text-white bg-green-600 hover:bg-green-700"
        onClick={() => router.push("/marks/view")}
      >
        View Marks <ArrowRight />
      </Button> */}
      {/* <h2 className="text-xl font-semibold mb-2">Save Marks</h2> */}

      <SearchStudent classes={classes} onSuccess={handleSearchStudent} />
      {/* //render form */}
      {students && students.length > 0 && subjects.length > 0 && (
        <MarksInputForm
          classId={classId}
          students={students}
          subjects={subjects}
          exams={exams}
        />
      )}
    </div>
  );
}
