-- AlterTable
ALTER TABLE "TreatyDetailCurrent" ALTER COLUMN "currentMaintenance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "currentExchange" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TreatyDetailPrior" ALTER COLUMN "priorMaintenance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "priorExchange" SET DATA TYPE DOUBLE PRECISION;
