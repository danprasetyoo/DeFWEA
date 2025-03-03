/*
  Warnings:

  - You are about to drop the column `detailIdr` on the `Layer` table. All the data in the column will be lost.
  - You are about to drop the column `detailShare` on the `Layer` table. All the data in the column will be lost.
  - You are about to drop the column `detailUsd` on the `Layer` table. All the data in the column will be lost.
  - You are about to drop the column `Brokerage` on the `TreatyYear` table. All the data in the column will be lost.
  - You are about to drop the column `Exchange` on the `TreatyYear` table. All the data in the column will be lost.
  - You are about to drop the column `Interest` on the `TreatyYear` table. All the data in the column will be lost.
  - You are about to drop the column `LAP` on the `TreatyYear` table. All the data in the column will be lost.
  - You are about to drop the column `Maintenance` on the `TreatyYear` table. All the data in the column will be lost.
  - You are about to drop the column `Margin` on the `TreatyYear` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[layerDetailIdPdma]` on the table `Layer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[layerDetailIdMa]` on the table `Layer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[layerDetailIdAv]` on the table `Layer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[layerDetailIdLiability]` on the table `Layer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[treatyDetailIdCurrent]` on the table `TreatyYear` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[treatyDetailIdPrior]` on the table `TreatyYear` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_layerDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_treatyDetailId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetailToLayerAv";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetailToLayerLiability";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetailToLayerMa";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetailToLayerPdma";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetailToTreatyYearCurrent";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetailToTreatyYearPrior";

-- DropIndex
DROP INDEX "LayerDetail_layerDetailIdAv_key";

-- DropIndex
DROP INDEX "LayerDetail_layerDetailIdLiability_key";

-- DropIndex
DROP INDEX "LayerDetail_layerDetailIdMa_key";

-- DropIndex
DROP INDEX "LayerDetail_layerDetailIdPdma_key";

-- DropIndex
DROP INDEX "TreatyDetail_treatyDetailIdCurrent_key";

-- DropIndex
DROP INDEX "TreatyDetail_treatyDetailIdPrior_key";

-- AlterTable
ALTER TABLE "Layer" DROP COLUMN "detailIdr",
DROP COLUMN "detailShare",
DROP COLUMN "detailUsd";

-- AlterTable
ALTER TABLE "LayerDetail" ADD COLUMN     "detailIdr" DOUBLE PRECISION,
ADD COLUMN     "detailShare" DOUBLE PRECISION,
ADD COLUMN     "detailUsd" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TreatyDetail" ADD COLUMN     "Brokerage" DOUBLE PRECISION,
ADD COLUMN     "Exchange" DOUBLE PRECISION,
ADD COLUMN     "Interest" DOUBLE PRECISION,
ADD COLUMN     "LAP" DOUBLE PRECISION,
ADD COLUMN     "Maintenance" DOUBLE PRECISION,
ADD COLUMN     "Margin" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TreatyYear" DROP COLUMN "Brokerage",
DROP COLUMN "Exchange",
DROP COLUMN "Interest",
DROP COLUMN "LAP",
DROP COLUMN "Maintenance",
DROP COLUMN "Margin";

-- CreateIndex
CREATE UNIQUE INDEX "Layer_layerDetailIdPdma_key" ON "Layer"("layerDetailIdPdma");

-- CreateIndex
CREATE UNIQUE INDEX "Layer_layerDetailIdMa_key" ON "Layer"("layerDetailIdMa");

-- CreateIndex
CREATE UNIQUE INDEX "Layer_layerDetailIdAv_key" ON "Layer"("layerDetailIdAv");

-- CreateIndex
CREATE UNIQUE INDEX "Layer_layerDetailIdLiability_key" ON "Layer"("layerDetailIdLiability");

-- CreateIndex
CREATE UNIQUE INDEX "TreatyYear_treatyDetailIdCurrent_key" ON "TreatyYear"("treatyDetailIdCurrent");

-- CreateIndex
CREATE UNIQUE INDEX "TreatyYear_treatyDetailIdPrior_key" ON "TreatyYear"("treatyDetailIdPrior");

-- AddForeignKey
ALTER TABLE "TreatyYear" ADD CONSTRAINT "TreatyDetailToTreatyYearCurrent" FOREIGN KEY ("treatyDetailIdCurrent") REFERENCES "TreatyDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatyYear" ADD CONSTRAINT "TreatyDetailToTreatyYearPrior" FOREIGN KEY ("treatyDetailIdPrior") REFERENCES "TreatyDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Layer" ADD CONSTRAINT "LayerDetailToLayerPdma" FOREIGN KEY ("layerDetailIdPdma") REFERENCES "LayerDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Layer" ADD CONSTRAINT "LayerDetailToLayerMa" FOREIGN KEY ("layerDetailIdMa") REFERENCES "LayerDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Layer" ADD CONSTRAINT "LayerDetailToLayerAv" FOREIGN KEY ("layerDetailIdAv") REFERENCES "LayerDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Layer" ADD CONSTRAINT "LayerDetailToLayerLiability" FOREIGN KEY ("layerDetailIdLiability") REFERENCES "LayerDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_layerDetailId_fkey" FOREIGN KEY ("layerDetailId") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
