/*
  Warnings:

  - Made the column `status` on table `UserGame` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserGame" ALTER COLUMN "status" SET NOT NULL;
