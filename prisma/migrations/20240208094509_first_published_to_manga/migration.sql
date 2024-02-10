/*
  Warnings:

  - Added the required column `firstPublished` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manga" ADD COLUMN     "firstPublished" TIMESTAMP(3) NOT NULL;
