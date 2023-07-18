/*
  Warnings:

  - The primary key for the `UserGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `UserGame` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `UserGame` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserGame_userId_key";

-- AlterTable
ALTER TABLE "UserGame" DROP CONSTRAINT "UserGame_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserGame_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGame_id_key" ON "UserGame"("id");
