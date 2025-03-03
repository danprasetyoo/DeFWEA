/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `calculatorId` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailId` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailIdr` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailShare` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailUsd` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `calculatorId` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailId` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `calculatorId` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailId` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `Brokerage` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `Exchange` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `Interest` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `LAP` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `Maintenance` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `Margin` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `calculatorId` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `treatyTypeId` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the `Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatyType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[layerDetailIdPdma]` on the table `LayerDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[layerDetailIdMa]` on the table `LayerDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[layerDetailIdAv]` on the table `LayerDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[layerDetailIdLiability]` on the table `LayerDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[treatyDetailIdCurrent]` on the table `TreatyDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[treatyDetailIdPrior]` on the table `TreatyDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetail_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetail_treatyTypeId_fkey";

-- AlterTable
ALTER TABLE "Calculator" DROP COLUMN "transactionId",
ADD COLUMN     "layerDetailId" INTEGER,
ADD COLUMN     "premiumId" INTEGER,
ADD COLUMN     "shareId" INTEGER,
ADD COLUMN     "treatyDetailId" INTEGER;

-- AlterTable
ALTER TABLE "LayerDetail" DROP COLUMN "calculatorId",
DROP COLUMN "detailId",
DROP COLUMN "detailIdr",
DROP COLUMN "detailShare",
DROP COLUMN "detailUsd",
DROP COLUMN "transactionId",
ADD COLUMN     "layerDetailIdAv" INTEGER,
ADD COLUMN     "layerDetailIdLiability" INTEGER,
ADD COLUMN     "layerDetailIdMa" INTEGER,
ADD COLUMN     "layerDetailIdPdma" INTEGER;

-- AlterTable
ALTER TABLE "PremiumDetail" DROP COLUMN "calculatorId",
DROP COLUMN "detailId",
DROP COLUMN "transactionId",
ADD COLUMN     "premiumIdAv" INTEGER,
ADD COLUMN     "premiumIdLiability" INTEGER,
ADD COLUMN     "premiumIdMa" INTEGER,
ADD COLUMN     "premiumIdPdma" INTEGER,
ALTER COLUMN "premiumUsd" DROP NOT NULL,
ALTER COLUMN "premiumUsd" DROP DEFAULT,
ALTER COLUMN "premiumIdr" DROP NOT NULL,
ALTER COLUMN "premiumIdr" DROP DEFAULT,
ALTER COLUMN "premiumShare" DROP NOT NULL,
ALTER COLUMN "premiumShare" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ShareDetail" DROP COLUMN "calculatorId",
DROP COLUMN "detailId",
DROP COLUMN "transactionId",
ADD COLUMN     "shareIdAv" INTEGER,
ADD COLUMN     "shareIdLiability" INTEGER,
ADD COLUMN     "shareIdMa" INTEGER,
ADD COLUMN     "shareIdPdma" INTEGER,
ALTER COLUMN "shareUsd" DROP NOT NULL,
ALTER COLUMN "shareUsd" DROP DEFAULT,
ALTER COLUMN "shareIdr" DROP NOT NULL,
ALTER COLUMN "shareIdr" DROP DEFAULT,
ALTER COLUMN "sharePremiumUsd" DROP NOT NULL,
ALTER COLUMN "sharePremiumUsd" DROP DEFAULT,
ALTER COLUMN "sharePremiumIdr" DROP NOT NULL,
ALTER COLUMN "sharePremiumIdr" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TreatyDetail" DROP COLUMN "Brokerage",
DROP COLUMN "Exchange",
DROP COLUMN "Interest",
DROP COLUMN "LAP",
DROP COLUMN "Maintenance",
DROP COLUMN "Margin",
DROP COLUMN "calculatorId",
DROP COLUMN "transactionId",
DROP COLUMN "treatyTypeId",
ADD COLUMN     "treatyDetailIdCurrent" INTEGER,
ADD COLUMN     "treatyDetailIdPrior" INTEGER;

-- DropTable
DROP TABLE "Detail";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "TreatyType";

-- CreateTable
CREATE TABLE "TreatyYear" (
    "id" SERIAL NOT NULL,
    "Exchange" DOUBLE PRECISION,
    "Margin" DOUBLE PRECISION,
    "Brokerage" DOUBLE PRECISION,
    "Interest" DOUBLE PRECISION,
    "LAP" DOUBLE PRECISION,
    "Maintenance" DOUBLE PRECISION,
    "treatyDetailIdCurrent" INTEGER,
    "treatyDetailIdPrior" INTEGER,

    CONSTRAINT "TreatyYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Layer" (
    "id" SERIAL NOT NULL,
    "detailUsd" DOUBLE PRECISION,
    "detailIdr" DOUBLE PRECISION,
    "detailShare" DOUBLE PRECISION,
    "layerDetailIdPdma" INTEGER,
    "layerDetailIdMa" INTEGER,
    "layerDetailIdAv" INTEGER,
    "layerDetailIdLiability" INTEGER,

    CONSTRAINT "Layer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Premium" (
    "id" SERIAL NOT NULL,
    "premiumIdPdma" INTEGER,
    "premiumIdMa" INTEGER,
    "premiumIdAv" INTEGER,
    "premiumIdLiability" INTEGER,

    CONSTRAINT "Premium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Share" (
    "id" SERIAL NOT NULL,
    "shareIdPdma" INTEGER,
    "shareIdMa" INTEGER,
    "shareIdAv" INTEGER,
    "shareIdLiability" INTEGER,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Premium_premiumIdPdma_key" ON "Premium"("premiumIdPdma");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_premiumIdMa_key" ON "Premium"("premiumIdMa");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_premiumIdAv_key" ON "Premium"("premiumIdAv");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_premiumIdLiability_key" ON "Premium"("premiumIdLiability");

-- CreateIndex
CREATE UNIQUE INDEX "Share_shareIdPdma_key" ON "Share"("shareIdPdma");

-- CreateIndex
CREATE UNIQUE INDEX "Share_shareIdMa_key" ON "Share"("shareIdMa");

-- CreateIndex
CREATE UNIQUE INDEX "Share_shareIdAv_key" ON "Share"("shareIdAv");

-- CreateIndex
CREATE UNIQUE INDEX "Share_shareIdLiability_key" ON "Share"("shareIdLiability");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdPdma_key" ON "LayerDetail"("layerDetailIdPdma");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdMa_key" ON "LayerDetail"("layerDetailIdMa");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdAv_key" ON "LayerDetail"("layerDetailIdAv");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdLiability_key" ON "LayerDetail"("layerDetailIdLiability");

-- CreateIndex
CREATE UNIQUE INDEX "TreatyDetail_treatyDetailIdCurrent_key" ON "TreatyDetail"("treatyDetailIdCurrent");

-- CreateIndex
CREATE UNIQUE INDEX "TreatyDetail_treatyDetailIdPrior_key" ON "TreatyDetail"("treatyDetailIdPrior");

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "TreatyDetailToTreatyYearCurrent" FOREIGN KEY ("treatyDetailIdCurrent") REFERENCES "TreatyYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "TreatyDetailToTreatyYearPrior" FOREIGN KEY ("treatyDetailIdPrior") REFERENCES "TreatyYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetailToLayerPdma" FOREIGN KEY ("layerDetailIdPdma") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetailToLayerMa" FOREIGN KEY ("layerDetailIdMa") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetailToLayerAv" FOREIGN KEY ("layerDetailIdAv") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetailToLayerLiability" FOREIGN KEY ("layerDetailIdLiability") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "PremiumToPremiumDetailPdma" FOREIGN KEY ("premiumIdPdma") REFERENCES "PremiumDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "PremiumToPremiumDetailMa" FOREIGN KEY ("premiumIdMa") REFERENCES "PremiumDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "PremiumToPremiumDetailAv" FOREIGN KEY ("premiumIdAv") REFERENCES "PremiumDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "PremiumToPremiumDetailLiability" FOREIGN KEY ("premiumIdLiability") REFERENCES "PremiumDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "ShareToShareDetailPdma" FOREIGN KEY ("shareIdPdma") REFERENCES "ShareDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "ShareToShareDetailMa" FOREIGN KEY ("shareIdMa") REFERENCES "ShareDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "ShareToShareDetailAv" FOREIGN KEY ("shareIdAv") REFERENCES "ShareDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "ShareToShareDetailLiability" FOREIGN KEY ("shareIdLiability") REFERENCES "ShareDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_layerDetailId_fkey" FOREIGN KEY ("layerDetailId") REFERENCES "LayerDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_premiumId_fkey" FOREIGN KEY ("premiumId") REFERENCES "Premium"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "Share"("id") ON DELETE SET NULL ON UPDATE CASCADE;
