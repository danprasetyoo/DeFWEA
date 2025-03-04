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
ALTER TABLE "TreatyYear" DROP CONSTRAINT "TreatyDetailToTreatyYearCurrent";

-- DropForeignKey
ALTER TABLE "TreatyYear" DROP CONSTRAINT "TreatyDetailToTreatyYearPrior";
