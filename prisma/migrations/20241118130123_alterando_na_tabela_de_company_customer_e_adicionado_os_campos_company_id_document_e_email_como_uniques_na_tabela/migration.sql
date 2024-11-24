/*
  Warnings:

  - A unique constraint covering the columns `[companyId,document,email]` on the table `companyCustomer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "companyCustomer_companyId_document_key";

-- DropIndex
DROP INDEX "companyCustomer_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "companyCustomer_companyId_document_email_key" ON "companyCustomer"("companyId", "document", "email");
