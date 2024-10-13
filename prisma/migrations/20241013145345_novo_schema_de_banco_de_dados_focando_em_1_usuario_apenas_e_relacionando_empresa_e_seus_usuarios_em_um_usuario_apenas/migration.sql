/*
  Warnings:

  - You are about to drop the column `password` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `avatarId` on the `companyRequester` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `companyRequester` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `companyRequester` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `companyRequester` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `companyRequester` table. All the data in the column will be lost.
  - You are about to drop the column `avatarId` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `documentType` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `companyUser` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `companyUser` table. All the data in the column will be lost.
  - Added the required column `userId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `companyRequester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `companyUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "lat" TEXT,
    "long" TEXT
);

-- CreateTable
CREATE TABLE "companyClient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    CONSTRAINT "companyClient_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "companyClient_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avatarId" TEXT,
    "userId" TEXT NOT NULL,
    "addressId" TEXT,
    "name" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companies_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "companies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companies" ("avatarId", "createdAt", "deletedAt", "document", "documentType", "email", "id", "name", "phone", "updatedAt") SELECT "avatarId", "createdAt", "deletedAt", "document", "documentType", "email", "id", "name", "phone", "updatedAt" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_userId_key" ON "companies"("userId");
CREATE UNIQUE INDEX "companies_document_key" ON "companies"("document");
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");
CREATE UNIQUE INDEX "companies_document_email_key" ON "companies"("document", "email");
CREATE TABLE "new_companyRequester" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companyRequester_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "companyRequester_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyRequester" ("companyId", "createdAt", "deletedAt", "id", "updatedAt") SELECT "companyId", "createdAt", "deletedAt", "id", "updatedAt" FROM "companyRequester";
DROP TABLE "companyRequester";
ALTER TABLE "new_companyRequester" RENAME TO "companyRequester";
CREATE UNIQUE INDEX "companyRequester_companyId_userId_key" ON "companyRequester"("companyId", "userId");
CREATE TABLE "new_companyUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "companyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyUser" ("companyId", "createdAt", "deletedAt", "id", "lat", "long", "updatedAt") SELECT "companyId", "createdAt", "deletedAt", "id", "lat", "long", "updatedAt" FROM "companyUser";
DROP TABLE "companyUser";
ALTER TABLE "new_companyUser" RENAME TO "companyUser";
CREATE UNIQUE INDEX "companyUser_companyId_userId_key" ON "companyUser"("companyId", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "companyClient_companyId_document_key" ON "companyClient"("companyId", "document");
