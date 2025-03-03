-- AlterTable
ALTER TABLE "LayerDetail" ADD COLUMN     "transactionCode" TEXT;

-- AlterTable
ALTER TABLE "PremiumDetail" ADD COLUMN     "transactionCode" TEXT;

-- AlterTable
ALTER TABLE "ShareDetail" ADD COLUMN     "transactionCode" TEXT;

-- AlterTable
ALTER TABLE "TreatyDetail" ADD COLUMN     "transactionCode" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionCode" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountUSD" DOUBLE PRECISION,
    "amountIDR" DOUBLE PRECISION,
    "treatyYearId" INTEGER,
    "treatyDetailId" INTEGER,
    "layerId" INTEGER,
    "layerDetailId" INTEGER,
    "premiumId" INTEGER,
    "premiumDetailId" INTEGER,
    "shareId" INTEGER,
    "shareDetailId" INTEGER,
    "version" TEXT NOT NULL DEFAULT '1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "calculatorId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionCode_key" ON "Transaction"("transactionCode");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_calculatorId_key" ON "Transaction"("calculatorId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_treatyYearId_fkey" FOREIGN KEY ("treatyYearId") REFERENCES "TreatyYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_layerDetailId_fkey" FOREIGN KEY ("layerDetailId") REFERENCES "LayerDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_premiumId_fkey" FOREIGN KEY ("premiumId") REFERENCES "Premium"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_premiumDetailId_fkey" FOREIGN KEY ("premiumDetailId") REFERENCES "PremiumDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "Share"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_shareDetailId_fkey" FOREIGN KEY ("shareDetailId") REFERENCES "ShareDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
