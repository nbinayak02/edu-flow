/*
  Warnings:

  - You are about to alter the column `credit_hour` on the `Subject` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "credit_hour" SET DATA TYPE DOUBLE PRECISION;
