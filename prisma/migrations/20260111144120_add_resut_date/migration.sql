/*
  Warnings:

  - Added the required column `resultDate` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "resultDate" TEXT NOT NULL;
