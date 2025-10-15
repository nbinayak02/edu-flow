-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "gurdian" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "sclassId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
