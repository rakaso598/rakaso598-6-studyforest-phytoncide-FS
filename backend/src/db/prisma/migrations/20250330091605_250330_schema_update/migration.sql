/*
  Warnings:

  - You are about to drop the `Focus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Focus" DROP CONSTRAINT "Focus_studyId_fkey";

-- AlterTable
ALTER TABLE "Emojis" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Study" ALTER COLUMN "point" SET DEFAULT 0;

-- DropTable
DROP TABLE "Focus";
