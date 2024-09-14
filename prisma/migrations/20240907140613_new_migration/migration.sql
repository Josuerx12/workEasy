/*
  Warnings:

  - You are about to drop the column `avatar` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `companyRequester` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - Added the required column `avatarId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarId` to the `companyRequester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarId` to the `companyUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "avatar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

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
    "avatarId" TEXT NOT NULL,
    CONSTRAINT "companies_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companies" ("createdAt", "deletedAt", "document", "documentType", "email", "id", "name", "password", "phone", "updatedAt") SELECT "createdAt", "deletedAt", "document", "documentType", "email", "id", "name", "password", "phone", "updatedAt" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_document_email_key" ON "companies"("document", "email");
CREATE TABLE "new_companyRequester" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avatarId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companyRequester_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyRequester" ("createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt" FROM "companyRequester";
DROP TABLE "companyRequester";
ALTER TABLE "new_companyRequester" RENAME TO "companyRequester";
CREATE UNIQUE INDEX "companyRequester_email_key" ON "companyRequester"("email");
CREATE TABLE "new_companyUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "avatarId" TEXT NOT NULL,
    CONSTRAINT "companyUser_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "companyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyUser" ("companyId", "createdAt", "deletedAt", "document", "documentType", "email", "id", "lat", "long", "name", "password", "phone", "updatedAt") SELECT "companyId", "createdAt", "deletedAt", "document", "documentType", "email", "id", "lat", "long", "name", "password", "phone", "updatedAt" FROM "companyUser";
DROP TABLE "companyUser";
ALTER TABLE "new_companyUser" RENAME TO "companyUser";
CREATE UNIQUE INDEX "companyUser_document_email_key" ON "companyUser"("document", "email");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "moderator" BOOLEAN NOT NULL DEFAULT false,
    "support" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "avatarId" TEXT NOT NULL,
    CONSTRAINT "user_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("admin", "createdAt", "deletedAt", "email", "id", "moderator", "password", "support", "updatedAt") SELECT "admin", "createdAt", "deletedAt", "email", "id", "moderator", "password", "support", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
