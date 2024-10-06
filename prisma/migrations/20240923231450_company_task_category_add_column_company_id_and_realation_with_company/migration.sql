/*
  Warnings:

  - Added the required column `companyId` to the `companyTaskCategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companyTaskCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companyTaskCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyTaskCategory" ("createdAt", "deletedAt", "description", "id", "title", "updatedAt") SELECT "createdAt", "deletedAt", "description", "id", "title", "updatedAt" FROM "companyTaskCategory";
DROP TABLE "companyTaskCategory";
ALTER TABLE "new_companyTaskCategory" RENAME TO "companyTaskCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
