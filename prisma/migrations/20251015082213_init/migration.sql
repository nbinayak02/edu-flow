/*
  Warnings:

  - Added the required column `iemis` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "iemis" TEXT NOT NULL;
