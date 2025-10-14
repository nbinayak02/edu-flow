/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Class" DROP CONSTRAINT "Class_schoolId_fkey";

-- DropTable
DROP TABLE "public"."Class";

-- CreateTable
CREATE TABLE "Sclass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Sclass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sclass" ADD CONSTRAINT "Sclass_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
