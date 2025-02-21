-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_detailId_fkey";

-- DropForeignKey
ALTER TABLE "ShareDetail" DROP CONSTRAINT "ShareDetail_detailId_fkey";

-- CreateTable
CREATE TABLE "TreatyDetail" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "treatyTypeId" INTEGER NOT NULL,
    "Exchange" DOUBLE PRECISION DEFAULT 0,
    "Margin" DOUBLE PRECISION DEFAULT 0,
    "Brokerage" DOUBLE PRECISION DEFAULT 0,
    "Interest" DOUBLE PRECISION DEFAULT 0,
    "LAP" DOUBLE PRECISION DEFAULT 0,
    "Maintenance" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "TreatyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatyType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TreatyType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TreatyType_description_key" ON "TreatyType"("description");

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "TreatyDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "TreatyDetail_treatyTypeId_fkey" FOREIGN KEY ("treatyTypeId") REFERENCES "TreatyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
