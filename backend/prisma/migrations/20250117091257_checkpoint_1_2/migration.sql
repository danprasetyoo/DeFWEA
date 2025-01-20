/*
  Warnings:

  - You are about to drop the `avDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `liabilityDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `liabilityDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `liabilityDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pdmaDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pdmaDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pdmaDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatyDetailCurrent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatyDetailPrior` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_avLayerId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_liabilityLayerId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_maLayerId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_pdmaLayerId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_avPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_liabilityPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_maPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_pdmaPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_avShareId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_liabilityShareId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_maShareId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_pdmaShareId_fkey";

-- DropForeignKey
ALTER TABLE "treatyDetailCurrent" DROP CONSTRAINT "treatyDetailCurrent_treatyDetailId_fkey";

-- DropForeignKey
ALTER TABLE "treatyDetailPrior" DROP CONSTRAINT "treatyDetailPrior_treatyDetailId_fkey";

-- DropTable
DROP TABLE "avDetailLayer";

-- DropTable
DROP TABLE "avDetailPremium";

-- DropTable
DROP TABLE "avDetailShare";

-- DropTable
DROP TABLE "liabilityDetailLayer";

-- DropTable
DROP TABLE "liabilityDetailPremium";

-- DropTable
DROP TABLE "liabilityDetailShare";

-- DropTable
DROP TABLE "maDetailLayer";

-- DropTable
DROP TABLE "maDetailPremium";

-- DropTable
DROP TABLE "maDetailShare";

-- DropTable
DROP TABLE "pdmaDetailLayer";

-- DropTable
DROP TABLE "pdmaDetailPremium";

-- DropTable
DROP TABLE "pdmaDetailShare";

-- DropTable
DROP TABLE "treatyDetailCurrent";

-- DropTable
DROP TABLE "treatyDetailPrior";

-- CreateTable
CREATE TABLE "TreatyDetailCurrent" (
    "id" SERIAL NOT NULL,
    "currentExchange" INTEGER NOT NULL,
    "currentMargin" DOUBLE PRECISION NOT NULL,
    "currentBrokerage" DOUBLE PRECISION NOT NULL,
    "currentInterest" DOUBLE PRECISION NOT NULL,
    "currentLAP" DOUBLE PRECISION NOT NULL,
    "currentMaintenance" DOUBLE PRECISION NOT NULL,
    "treatyDetailId" INTEGER NOT NULL,

    CONSTRAINT "TreatyDetailCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatyDetailPrior" (
    "id" SERIAL NOT NULL,
    "priorExchange" INTEGER NOT NULL,
    "priorMargin" DOUBLE PRECISION NOT NULL,
    "priorBrokerage" DOUBLE PRECISION NOT NULL,
    "priorInterest" DOUBLE PRECISION NOT NULL,
    "priorLAP" DOUBLE PRECISION NOT NULL,
    "priorMaintenance" DOUBLE PRECISION NOT NULL,
    "treatyDetailId" INTEGER NOT NULL,

    CONSTRAINT "TreatyDetailPrior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdmaDetailLayer" (
    "id" SERIAL NOT NULL,
    "pdmaDetailUsd" INTEGER NOT NULL,
    "pdmaDetailIdr" INTEGER NOT NULL,
    "pdmaDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "PdmaDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaDetailLayer" (
    "id" SERIAL NOT NULL,
    "maDetailUsd" INTEGER NOT NULL,
    "maDetailIdr" INTEGER NOT NULL,
    "maDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "MaDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvDetailLayer" (
    "id" SERIAL NOT NULL,
    "avDetailUsd" INTEGER NOT NULL,
    "avDetailIdr" INTEGER NOT NULL,
    "avDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "AvDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiabilityDetailLayer" (
    "id" SERIAL NOT NULL,
    "liabilityDetailUsd" INTEGER NOT NULL,
    "liabilityDetailIdr" INTEGER NOT NULL,
    "liabilityDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "LiabilityDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdmaDetailPremium" (
    "id" SERIAL NOT NULL,
    "pdmaPremiumUsd" INTEGER NOT NULL,
    "pdmaPremiumIdr" INTEGER NOT NULL,
    "pdmaPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "PdmaDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaDetailPremium" (
    "id" SERIAL NOT NULL,
    "maPremiumUsd" INTEGER NOT NULL,
    "maPremiumIdr" INTEGER NOT NULL,
    "maPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "MaDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvDetailPremium" (
    "id" SERIAL NOT NULL,
    "avPremiumUsd" INTEGER NOT NULL,
    "avPremiumIdr" INTEGER NOT NULL,
    "avPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "AvDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiabilityDetailPremium" (
    "id" SERIAL NOT NULL,
    "liabilityPremiumUsd" INTEGER NOT NULL,
    "liabilityPremiumIdr" INTEGER NOT NULL,
    "liabilityPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "LiabilityDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdmaDetailShare" (
    "id" SERIAL NOT NULL,
    "pdmaShareUsd" INTEGER NOT NULL,
    "pdmaShareIdr" INTEGER NOT NULL,
    "pdmaSharePremiumUsd" INTEGER NOT NULL,
    "pdmaSharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "PdmaDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaDetailShare" (
    "id" SERIAL NOT NULL,
    "maShareUsd" INTEGER NOT NULL,
    "maShareIdr" INTEGER NOT NULL,
    "maSharePremiumUsd" INTEGER NOT NULL,
    "maSharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "MaDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvDetailShare" (
    "id" SERIAL NOT NULL,
    "avShareUsd" INTEGER NOT NULL,
    "avShareIdr" INTEGER NOT NULL,
    "avSharePremiumUsd" INTEGER NOT NULL,
    "avSharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "AvDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiabilityDetailShare" (
    "id" SERIAL NOT NULL,
    "liabilityShareUsd" INTEGER NOT NULL,
    "liabilityShareIdr" INTEGER NOT NULL,
    "liabilitySharePremiumUsd" INTEGER NOT NULL,
    "liabilitySharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "LiabilityDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TreatyDetailCurrent_treatyDetailId_key" ON "TreatyDetailCurrent"("treatyDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "TreatyDetailPrior_treatyDetailId_key" ON "TreatyDetailPrior"("treatyDetailId");

-- AddForeignKey
ALTER TABLE "TreatyDetailCurrent" ADD CONSTRAINT "TreatyDetailCurrent_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatyDetailPrior" ADD CONSTRAINT "TreatyDetailPrior_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_pdmaLayerId_fkey" FOREIGN KEY ("pdmaLayerId") REFERENCES "PdmaDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_maLayerId_fkey" FOREIGN KEY ("maLayerId") REFERENCES "MaDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_avLayerId_fkey" FOREIGN KEY ("avLayerId") REFERENCES "AvDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_liabilityLayerId_fkey" FOREIGN KEY ("liabilityLayerId") REFERENCES "LiabilityDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_pdmaPremiumId_fkey" FOREIGN KEY ("pdmaPremiumId") REFERENCES "PdmaDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_maPremiumId_fkey" FOREIGN KEY ("maPremiumId") REFERENCES "MaDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_avPremiumId_fkey" FOREIGN KEY ("avPremiumId") REFERENCES "AvDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_liabilityPremiumId_fkey" FOREIGN KEY ("liabilityPremiumId") REFERENCES "LiabilityDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_pdmaShareId_fkey" FOREIGN KEY ("pdmaShareId") REFERENCES "PdmaDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_maShareId_fkey" FOREIGN KEY ("maShareId") REFERENCES "MaDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_avShareId_fkey" FOREIGN KEY ("avShareId") REFERENCES "AvDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_liabilityShareId_fkey" FOREIGN KEY ("liabilityShareId") REFERENCES "LiabilityDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
