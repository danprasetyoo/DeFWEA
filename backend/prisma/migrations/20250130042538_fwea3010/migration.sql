/*
  Warnings:

  - You are about to drop the `AvDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LayerDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiabilityDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiabilityDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiabilityDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PdmaDetailLayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PdmaDetailPremium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PdmaDetailShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PremiumDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShareDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatyDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatyDetailCurrent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreatyDetailPrior` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Calculator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_avLayerId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_liabilityLayerId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_maLayerId_fkey";

-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_pdmaLayerId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_avPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_liabilityPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_maPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_pdmaPremiumId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_avShareId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_liabilityShareId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_maShareId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_pdmaShareId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "TreatyDetail_calculatorId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetailCurrent" DROP CONSTRAINT "TreatyDetailCurrent_treatyDetailId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetailPrior" DROP CONSTRAINT "TreatyDetailPrior_treatyDetailId_fkey";

-- AlterTable
ALTER TABLE "Calculator" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "inputLayerDetail" JSONB,
ADD COLUMN     "inputPremium" JSONB,
ADD COLUMN     "inputShare" JSONB,
ADD COLUMN     "inputTreatyDetail" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "AvDetailLayer";

-- DropTable
DROP TABLE "AvDetailPremium";

-- DropTable
DROP TABLE "AvDetailShare";

-- DropTable
DROP TABLE "LayerDetail";

-- DropTable
DROP TABLE "LiabilityDetailLayer";

-- DropTable
DROP TABLE "LiabilityDetailPremium";

-- DropTable
DROP TABLE "LiabilityDetailShare";

-- DropTable
DROP TABLE "MaDetailLayer";

-- DropTable
DROP TABLE "MaDetailPremium";

-- DropTable
DROP TABLE "MaDetailShare";

-- DropTable
DROP TABLE "PdmaDetailLayer";

-- DropTable
DROP TABLE "PdmaDetailPremium";

-- DropTable
DROP TABLE "PdmaDetailShare";

-- DropTable
DROP TABLE "PremiumDetail";

-- DropTable
DROP TABLE "ShareDetail";

-- DropTable
DROP TABLE "TreatyDetail";

-- DropTable
DROP TABLE "TreatyDetailCurrent";

-- DropTable
DROP TABLE "TreatyDetailPrior";
