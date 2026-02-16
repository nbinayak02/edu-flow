-- DropForeignKey
ALTER TABLE "Sclass" DROP CONSTRAINT "Sclass_schoolId_fkey";

-- AddForeignKey
ALTER TABLE "Sclass" ADD CONSTRAINT "Sclass_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
