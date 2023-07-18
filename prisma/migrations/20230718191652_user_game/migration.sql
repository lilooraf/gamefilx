/*
  Warnings:

  - The primary key for the `UserGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserGame` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserGame` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserGame" DROP CONSTRAINT "UserGame_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserGame_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGame_userId_key" ON "UserGame"("userId");
