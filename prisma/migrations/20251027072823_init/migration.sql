/*
  Warnings:

  - The primary key for the `ExamDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ExamDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."ExamDetails_subjectId_key";

-- AlterTable
ALTER TABLE "ExamDetails" DROP CONSTRAINT "ExamDetails_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ExamDetails_pkey" PRIMARY KEY ("examId", "subjectId");
