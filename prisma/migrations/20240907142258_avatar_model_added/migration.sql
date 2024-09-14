/*
  Warnings:

  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "avatarId" TEXT,
    CONSTRAINT "companies_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_companies" ("avatarId", "createdAt", "deletedAt", "document", "documentType", "email", "id", "name", "password", "phone", "updatedAt") SELECT "avatarId", "createdAt", "deletedAt", "document", "documentType", "email", "id", "name", "password", "phone", "updatedAt" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_document_email_key" ON "companies"("document", "email");
CREATE TABLE "new_companyRequester" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avatarId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companyRequester_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_companyRequester" ("avatarId", "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt") SELECT "avatarId", "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt" FROM "companyRequester";
DROP TABLE "companyRequester";
ALTER TABLE "new_companyRequester" RENAME TO "companyRequester";
CREATE UNIQUE INDEX "companyRequester_email_key" ON "companyRequester"("email");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    "support" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "avatarId" TEXT,
    CONSTRAINT "user_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("admin", "avatarId", "createdAt", "deletedAt", "email", "id", "moderator", "password", "support", "updatedAt") SELECT "admin", "avatarId", "createdAt", "deletedAt", "email", "id", "moderator", "password", "support", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
