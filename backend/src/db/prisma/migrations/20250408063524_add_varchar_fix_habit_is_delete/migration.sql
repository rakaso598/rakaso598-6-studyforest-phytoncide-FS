/*
  Warnings:

  - You are about to drop the column `isDone` on the `Habit` table. All the data in the column will be lost.
  - Changed the type of `background` on the `Study` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StudyBackgrounds" AS ENUM ('bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8');

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "isDone",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "background",
ADD COLUMN     "background" "StudyBackgrounds" NOT NULL;

-- DropEnum
DROP TYPE "Study_backgrounds";
