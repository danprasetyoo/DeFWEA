-- AlterTable
ALTER TABLE "LayerDetail" ADD COLUMN     "calculatorId" INTEGER;

-- AlterTable
ALTER TABLE "PremiumDetail" ADD COLUMN     "calculatorId" INTEGER;

-- AlterTable
ALTER TABLE "ShareDetail" ADD COLUMN     "calculatorId" INTEGER;

-- AlterTable
ALTER TABLE "TreatyDetail" ADD COLUMN     "calculatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "TreatyDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
