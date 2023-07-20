/*
  Warnings:

  - You are about to drop the column `score` on the `UserGame` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserGame" DROP COLUMN "score",
ADD COLUMN     "rating" INTEGER;
