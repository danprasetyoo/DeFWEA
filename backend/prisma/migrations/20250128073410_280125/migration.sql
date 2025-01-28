/*
  Warnings:

  - You are about to alter the column `currentMaintenance` on the `TreatyDetailCurrent` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `priorMaintenance` on the `TreatyDetailPrior` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Changed the type of `currentExchange` on the `TreatyDetailCurrent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priorExchange` on the `TreatyDetailPrior` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TreatyDetailCurrent" DROP COLUMN "currentExchange",
ADD COLUMN     "currentExchange" INTEGER NOT NULL,
ALTER COLUMN "currentMaintenance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TreatyDetailPrior" DROP COLUMN "priorExchange",
ADD COLUMN     "priorExchange" INTEGER NOT NULL,
ALTER COLUMN "priorMaintenance" SET DATA TYPE INTEGER;
