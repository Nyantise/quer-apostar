/*
  Warnings:

  - Added the required column `amountBet` to the `bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awayTeamScore` to the `bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamScore` to the `bets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'WIN', 'LOST');

-- AlterTable
ALTER TABLE "bets" ADD COLUMN     "amountBet" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amountWon" DOUBLE PRECISION,
ADD COLUMN     "awayTeamScore" INTEGER NOT NULL,
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "homeTeamScore" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'PENDING';

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeTeamName" TEXT NOT NULL,
    "awayTeamName" TEXT NOT NULL,
    "homeTeamScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeamScore" INTEGER NOT NULL DEFAULT 0,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
