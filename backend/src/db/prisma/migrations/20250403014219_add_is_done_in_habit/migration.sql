-- DropIndex
DROP INDEX "HabitDone_habitId_dayOfWeek_key";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;
