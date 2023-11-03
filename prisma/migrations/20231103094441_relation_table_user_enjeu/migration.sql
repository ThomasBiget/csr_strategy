/*
  Warnings:

  - Added the required column `authorId` to the `Enjeu` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enjeu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "pilier" TEXT NOT NULL,
    "esrs" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "business_impact" INTEGER NOT NULL,
    "soc_en_impact" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Enjeu_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Enjeu" ("business_impact", "color", "createdAt", "description", "esrs", "id", "label", "pilier", "soc_en_impact", "updatedAt") SELECT "business_impact", "color", "createdAt", "description", "esrs", "id", "label", "pilier", "soc_en_impact", "updatedAt" FROM "Enjeu";
DROP TABLE "Enjeu";
ALTER TABLE "new_Enjeu" RENAME TO "Enjeu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
