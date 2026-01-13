/*
  Warnings:

  - The primary key for the `ExamDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `credit_hour` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `sclassId` on the `Subject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,schoolId,section]` on the table `Sclass` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section` to the `Sclass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_sclassId_fkey";

-- DropIndex
DROP INDEX "School_userId_key";

-- AlterTable
ALTER TABLE "ExamDetails" DROP CONSTRAINT "ExamDetails_pkey",
ADD CONSTRAINT "ExamDetails_pkey" PRIMARY KEY ("examId", "subjectId", "sclassId");

-- AlterTable
ALTER TABLE "School" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Sclass" ADD COLUMN     "section" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "credit_hour",
DROP COLUMN "sclassId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "schoolId" INTEGER;

-- CreateTable
CREATE TABLE "SubjectAssigned" (
    "subjectId" INTEGER NOT NULL,
    "sclassId" INTEGER NOT NULL,
    "credit_hour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SubjectAssigned_pkey" PRIMARY KEY ("subjectId","sclassId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sclass_name_schoolId_section_key" ON "Sclass"("name", "schoolId", "section");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectAssigned" ADD CONSTRAINT "SubjectAssigned_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectAssigned" ADD CONSTRAINT "SubjectAssigned_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
