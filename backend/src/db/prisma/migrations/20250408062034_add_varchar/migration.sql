/*
  Warnings:

  - You are about to alter the column `nickName` on the `Study` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `title` on the `Study` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Study" ALTER COLUMN "nickName" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(10);
