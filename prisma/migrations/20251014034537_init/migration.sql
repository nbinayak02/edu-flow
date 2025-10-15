-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "credit_hour" DECIMAL(65,30) NOT NULL,
    "sclassId" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
