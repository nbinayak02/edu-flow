/*
  Warnings:

  - Changed the type of `estd` on the `School` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "School" DROP COLUMN "estd",
ADD COLUMN     "estd" INTEGER NOT NULL;
