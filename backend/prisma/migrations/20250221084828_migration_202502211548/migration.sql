/*
  Warnings:

  - You are about to drop the column `layerDetailId` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `premiumId` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `shareId` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `treatyDetailId` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `layerDetailIdAv` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `layerDetailIdLiability` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `layerDetailIdMa` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `layerDetailIdPdma` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `premiumIdAv` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `premiumIdLiability` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `premiumIdMa` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `premiumIdPdma` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `shareIdAv` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `shareIdLiability` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `shareIdMa` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `shareIdPdma` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the `Layer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Premium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatyDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatyYear` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transactionId` to the `Calculator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailId` to the `LayerDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `LayerDetail` table without a default value. This is not possible if the table is not empty.
  - Made the column `detailIdr` on table `LayerDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailShare` on table `LayerDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailUsd` on table `LayerDetail` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `detailId` to the `PremiumDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `PremiumDetail` table without a default value. This is not possible if the table is not empty.
  - Made the column `premiumUsd` on table `PremiumDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `premiumIdr` on table `PremiumDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `premiumShare` on table `PremiumDetail` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `detailId` to the `ShareDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `ShareDetail` table without a default value. This is not possible if the table is not empty.
  - Made the column `shareUsd` on table `ShareDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shareIdr` on table `ShareDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sharePremiumUsd` on table `ShareDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sharePremiumIdr` on table `ShareDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_layerDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_premiumId_fkey";

-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_shareId_fkey";

-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_treatyDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Layer" DROP CONSTRAINT "LayerDetailToLayerAv";

-- DropForeignKey
ALTER TABLE "Layer" DROP CONSTRAINT "LayerDetailToLayerLiability";

-- DropForeignKey
ALTER TABLE "Layer" DROP CONSTRAINT "LayerDetailToLayerMa";

-- DropForeignKey
ALTER TABLE "Layer" DROP CONSTRAINT "LayerDetailToLayerPdma";

-- DropForeignKey
ALTER TABLE "Premium" DROP CONSTRAINT "PremiumToPremiumDetailAv";

-- DropForeignKey
ALTER TABLE "Premium" DROP CONSTRAINT "PremiumToPremiumDetailLiability";

-- DropForeignKey
ALTER TABLE "Premium" DROP CONSTRAINT "PremiumToPremiumDetailMa";

-- DropForeignKey
ALTER TABLE "Premium" DROP CONSTRAINT "PremiumToPremiumDetailPdma";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "ShareToShareDetailAv";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "ShareToShareDetailLiability";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "ShareToShareDetailMa";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "ShareToShareDetailPdma";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetailToTreatyYearCurrent";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetailToTreatyYearPrior";

-- AlterTable
ALTER TABLE "Calculator" DROP COLUMN "layerDetailId",
DROP COLUMN "premiumId",
DROP COLUMN "shareId",
DROP COLUMN "treatyDetailId",
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LayerDetail" DROP COLUMN "layerDetailIdAv",
DROP COLUMN "layerDetailIdLiability",
DROP COLUMN "layerDetailIdMa",
DROP COLUMN "layerDetailIdPdma",
ADD COLUMN     "detailId" INTEGER NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL,
ALTER COLUMN "detailIdr" SET NOT NULL,
ALTER COLUMN "detailIdr" SET DEFAULT 0,
ALTER COLUMN "detailShare" SET NOT NULL,
ALTER COLUMN "detailShare" SET DEFAULT 0,
ALTER COLUMN "detailUsd" SET NOT NULL,
ALTER COLUMN "detailUsd" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PremiumDetail" DROP COLUMN "premiumIdAv",
DROP COLUMN "premiumIdLiability",
DROP COLUMN "premiumIdMa",
DROP COLUMN "premiumIdPdma",
ADD COLUMN     "detailId" INTEGER NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL,
ALTER COLUMN "premiumUsd" SET NOT NULL,
ALTER COLUMN "premiumUsd" SET DEFAULT 0,
ALTER COLUMN "premiumIdr" SET NOT NULL,
ALTER COLUMN "premiumIdr" SET DEFAULT 0,
ALTER COLUMN "premiumShare" SET NOT NULL,
ALTER COLUMN "premiumShare" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ShareDetail" DROP COLUMN "shareIdAv",
DROP COLUMN "shareIdLiability",
DROP COLUMN "shareIdMa",
DROP COLUMN "shareIdPdma",
ADD COLUMN     "detailId" INTEGER NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL,
ALTER COLUMN "shareUsd" SET NOT NULL,
ALTER COLUMN "shareUsd" SET DEFAULT 0,
ALTER COLUMN "shareIdr" SET NOT NULL,
ALTER COLUMN "shareIdr" SET DEFAULT 0,
ALTER COLUMN "sharePremiumUsd" SET NOT NULL,
ALTER COLUMN "sharePremiumUsd" SET DEFAULT 0,
ALTER COLUMN "sharePremiumIdr" SET NOT NULL,
ALTER COLUMN "sharePremiumIdr" SET DEFAULT 0;

-- DropTable
DROP TABLE "Layer";

-- DropTable
DROP TABLE "Premium";

-- DropTable
DROP TABLE "Share";

-- DropTable
DROP TABLE "TreatyDetail";

-- DropTable
DROP TABLE "TreatyYear";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionCode_key" ON "Transaction"("transactionCode");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_description_key" ON "Detail"("description");

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
