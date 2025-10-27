/*
  Warnings:

  - A unique constraint covering the columns `[subjectId]` on the table `ExamDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExamDetails_subjectId_key" ON "ExamDetails"("subjectId");
