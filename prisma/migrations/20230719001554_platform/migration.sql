-- CreateTable
CREATE TABLE "Platform" (
    "name" TEXT NOT NULL,
    "longName" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_PlatformToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PlatformToUser_AB_unique" ON "_PlatformToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlatformToUser_B_index" ON "_PlatformToUser"("B");

-- AddForeignKey
ALTER TABLE "_PlatformToUser" ADD CONSTRAINT "_PlatformToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Platform"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformToUser" ADD CONSTRAINT "_PlatformToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
