/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `companyCustomer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `companyCustomer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companyCustomer" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companyCustomer_email_key" ON "companyCustomer"("email");
