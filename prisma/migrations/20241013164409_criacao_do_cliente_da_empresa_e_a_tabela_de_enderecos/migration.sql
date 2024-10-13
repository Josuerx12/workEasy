/*
  Warnings:

  - You are about to drop the column `lat` on the `companyClient` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `companyClient` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companyClient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    CONSTRAINT "companyClient_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "companyClient_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyClient" ("addressId", "companyId", "document", "documentType", "id", "name", "phone") SELECT "addressId", "companyId", "document", "documentType", "id", "name", "phone" FROM "companyClient";
DROP TABLE "companyClient";
ALTER TABLE "new_companyClient" RENAME TO "companyClient";
CREATE UNIQUE INDEX "companyClient_companyId_document_key" ON "companyClient"("companyId", "document");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
