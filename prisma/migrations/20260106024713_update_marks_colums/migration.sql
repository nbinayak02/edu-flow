/*
  Warnings:

  - You are about to drop the column `gradeLetter` on the `Marksheet` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Marksheet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Marks" ADD COLUMN     "finalGrade" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gradePoint" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "prGradeLetter" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "thGradeLetter" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Marksheet" DROP COLUMN "gradeLetter",
DROP COLUMN "total",
ADD COLUMN     "totalCreditHour" DOUBLE PRECISION NOT NULL DEFAULT 0;
