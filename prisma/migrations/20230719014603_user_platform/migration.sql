/*
  Warnings:

  - You are about to drop the `_PlatformToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlatformToUser" DROP CONSTRAINT "_PlatformToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlatformToUser" DROP CONSTRAINT "_PlatformToUser_B_fkey";

-- DropTable
DROP TABLE "_PlatformToUser";

-- CreateTable
CREATE TABLE "UserPlatform" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,

    CONSTRAINT "UserPlatform_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPlatform" ADD CONSTRAINT "UserPlatform_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlatform" ADD CONSTRAINT "UserPlatform_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("name") ON DELETE CASCADE ON UPDATE CASCADE;
