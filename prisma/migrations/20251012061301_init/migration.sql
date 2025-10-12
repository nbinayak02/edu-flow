-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "iemis" TEXT NOT NULL,
    "estd" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);
