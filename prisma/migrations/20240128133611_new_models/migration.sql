-- CreateTable
CREATE TABLE "Manga" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("userId","mangaId")
);

-- CreateTable
CREATE TABLE "_Favourited" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToManga" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Favourited_AB_unique" ON "_Favourited"("A", "B");

-- CreateIndex
CREATE INDEX "_Favourited_B_index" ON "_Favourited"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToManga_AB_unique" ON "_CategoryToManga"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToManga_B_index" ON "_CategoryToManga"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favourited" ADD CONSTRAINT "_Favourited_A_fkey" FOREIGN KEY ("A") REFERENCES "Manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favourited" ADD CONSTRAINT "_Favourited_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToManga" ADD CONSTRAINT "_CategoryToManga_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToManga" ADD CONSTRAINT "_CategoryToManga_B_fkey" FOREIGN KEY ("B") REFERENCES "Manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
