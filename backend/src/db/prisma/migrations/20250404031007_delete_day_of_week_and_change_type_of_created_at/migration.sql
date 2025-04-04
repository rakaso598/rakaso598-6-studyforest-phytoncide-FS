/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `HabitDone` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HabitDone" DROP COLUMN "dayOfWeek",
ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- DropEnum
DROP TYPE "DAY_OF_WEEK";
