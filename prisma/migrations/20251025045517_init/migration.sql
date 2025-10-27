-- CreateTable
CREATE TABLE "ExamDetails" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "sclassId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "thFullMarks" INTEGER NOT NULL,
    "thPassMarks" INTEGER NOT NULL,
    "prFullMarks" INTEGER NOT NULL,
    "prPassMarks" INTEGER NOT NULL,

    CONSTRAINT "ExamDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamDetails" ADD CONSTRAINT "ExamDetails_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamDetails" ADD CONSTRAINT "ExamDetails_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamDetails" ADD CONSTRAINT "ExamDetails_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
