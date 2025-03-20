-- CreateEnum
CREATE TYPE "Study_backgrounds" AS ENUM ('bg1', 'bg2', 'bg3', 'bg4', 'bg5');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT,
    "background" "Study_backgrounds",
    "point" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emojis" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "checkUserId" TEXT,
    "emojiContent" TEXT,

    CONSTRAINT "Emojis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitList" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "habitCheck" BOOLEAN NOT NULL,

    CONSTRAINT "HabitList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Focus" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Focus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emojis" ADD CONSTRAINT "Emojis_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emojis" ADD CONSTRAINT "Emojis_checkUserId_fkey" FOREIGN KEY ("checkUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitList" ADD CONSTRAINT "HabitList_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Focus" ADD CONSTRAINT "Focus_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
