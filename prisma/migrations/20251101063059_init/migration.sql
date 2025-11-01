-- CreateTable
CREATE TABLE "Marksheet" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "sclassId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "gradeLetter" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Marksheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marks" (
    "id" SERIAL NOT NULL,
    "marksheetId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "theoryMarks" DOUBLE PRECISION NOT NULL,
    "practicalMarks" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Marks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_marksheetId_fkey" FOREIGN KEY ("marksheetId") REFERENCES "Marksheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
