/*
  Warnings:

  - You are about to drop the column `isDone` on the `HabitDone` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[habitId,dayOfWeek]` on the table `HabitDone` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HabitDone" DROP COLUMN "isDone";

-- CreateIndex
CREATE UNIQUE INDEX "HabitDone_habitId_dayOfWeek_key" ON "HabitDone"("habitId", "dayOfWeek");
