/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `categoryId` on the `task` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `companyRequester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyTaskCategoryId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "category";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "companyTaskCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companyRequester" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avatarId" TEXT,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "companyRequester_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "companyRequester_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companyRequester" ("avatarId", "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt") SELECT "avatarId", "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt" FROM "companyRequester";
DROP TABLE "companyRequester";
ALTER TABLE "new_companyRequester" RENAME TO "companyRequester";
CREATE UNIQUE INDEX "companyRequester_email_key" ON "companyRequester"("email");
CREATE TABLE "new_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyRequesterId" TEXT NOT NULL,
    "companyTaskCategoryId" TEXT NOT NULL,
    "companyUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "task_companyUserId_fkey" FOREIGN KEY ("companyUserId") REFERENCES "companyUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "task_companyTaskCategoryId_fkey" FOREIGN KEY ("companyTaskCategoryId") REFERENCES "companyTaskCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_companyRequesterId_fkey" FOREIGN KEY ("companyRequesterId") REFERENCES "companyRequester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_task" ("companyRequesterId", "companyUserId", "createdAt", "deletedAt", "description", "id", "status", "title", "updatedAt") SELECT "companyRequesterId", "companyUserId", "createdAt", "deletedAt", "description", "id", "status", "title", "updatedAt" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
