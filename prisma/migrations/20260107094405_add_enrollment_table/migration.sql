/*
  Warnings:

  - You are about to drop the column `year` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `sclassId` on the `Marksheet` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Marksheet` table. All the data in the column will be lost.
  - You are about to drop the column `sclassId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iemis]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iemis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrollmentId` to the `Marksheet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Marksheet" DROP CONSTRAINT "Marksheet_sclassId_fkey";

-- DropForeignKey
ALTER TABLE "Marksheet" DROP CONSTRAINT "Marksheet_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_sclassId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "Marksheet" DROP COLUMN "sclassId",
DROP COLUMN "studentId",
ADD COLUMN     "enrollmentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "sclassId",
DROP COLUMN "year";

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "sclassId" INTEGER NOT NULL,
    "academicYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_sclassId_academicYear_key" ON "Enrollment"("studentId", "sclassId", "academicYear");

-- CreateIndex
CREATE UNIQUE INDEX "School_iemis_key" ON "School"("iemis");

-- CreateIndex
CREATE UNIQUE INDEX "Student_iemis_key" ON "Student"("iemis");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
