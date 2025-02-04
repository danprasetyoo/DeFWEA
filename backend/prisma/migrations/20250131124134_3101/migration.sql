/*
  Warnings:

  - You are about to drop the column `inputLayerDetail` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `inputPremium` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `inputShare` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `inputTreatyDetail` on the `Calculator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Calculator" DROP COLUMN "inputLayerDetail",
DROP COLUMN "inputPremium",
DROP COLUMN "inputShare",
DROP COLUMN "inputTreatyDetail",
ADD COLUMN     "layerDetailId" INTEGER,
ADD COLUMN     "premiumId" INTEGER,
ADD COLUMN     "shareId" INTEGER,
ADD COLUMN     "treatyDetailId" INTEGER,
ALTER COLUMN "inputStatementDate" SET DATA TYPE TEXT,
ALTER COLUMN "inputStatementPeriod" SET DATA TYPE TEXT,
ALTER COLUMN "version" SET DEFAULT '1',
ALTER COLUMN "version" SET DATA TYPE TEXT;

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
CREATE TABLE "TreatyDetail" (
    "id" SERIAL NOT NULL,
    "treatyDetailIdCurrent" INTEGER,
    "treatyDetailIdPrior" INTEGER,

    CONSTRAINT "TreatyDetail_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "LayerDetail" (
    "id" SERIAL NOT NULL,
    "layerDetailIdPdma" INTEGER,
    "layerDetailIdMa" INTEGER,
    "layerDetailIdAv" INTEGER,
    "layerDetailIdLiability" INTEGER,

    CONSTRAINT "LayerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremiumDetail" (
    "id" SERIAL NOT NULL,
    "premiumUsd" DOUBLE PRECISION,
    "premiumIdr" DOUBLE PRECISION,
    "premiumShare" DOUBLE PRECISION,
    "premiumIdPdma" INTEGER,
    "premiumIdMa" INTEGER,
    "premiumIdAv" INTEGER,
    "premiumIdLiability" INTEGER,

    CONSTRAINT "PremiumDetail_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "ShareDetail" (
    "id" SERIAL NOT NULL,
    "shareUsd" DOUBLE PRECISION,
    "shareIdr" DOUBLE PRECISION,
    "sharePremiumUsd" DOUBLE PRECISION,
    "sharePremiumIdr" DOUBLE PRECISION,
    "shareIdPdma" INTEGER,
    "shareIdMa" INTEGER,
    "shareIdAv" INTEGER,
    "shareIdLiability" INTEGER,

    CONSTRAINT "ShareDetail_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "TreatyDetail_treatyDetailIdCurrent_key" ON "TreatyDetail"("treatyDetailIdCurrent");

-- CreateIndex
CREATE UNIQUE INDEX "TreatyDetail_treatyDetailIdPrior_key" ON "TreatyDetail"("treatyDetailIdPrior");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdPdma_key" ON "LayerDetail"("layerDetailIdPdma");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdMa_key" ON "LayerDetail"("layerDetailIdMa");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdAv_key" ON "LayerDetail"("layerDetailIdAv");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_layerDetailIdLiability_key" ON "LayerDetail"("layerDetailIdLiability");

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
