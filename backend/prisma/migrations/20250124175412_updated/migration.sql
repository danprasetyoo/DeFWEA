/*
  Warnings:

  - You are about to drop the column `formDataId` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `LayerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `formDataId` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `PremiumDetail` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `ShareDetail` table. All the data in the column will be lost.
  - You are about to drop the column `formDataId` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `TreatyDetail` table. All the data in the column will be lost.
  - You are about to alter the column `currentMaintenance` on the `TreatyDetailCurrent` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `priorMaintenance` on the `TreatyDetailPrior` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `calculatorId` to the `LayerDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatorId` to the `PremiumDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatorId` to the `TreatyDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LayerDetail" DROP CONSTRAINT "LayerDetail_formDataId_fkey";

-- DropForeignKey
ALTER TABLE "PremiumDetail" DROP CONSTRAINT "PremiumDetail_formDataId_fkey";

-- DropForeignKey
ALTER TABLE "TreatyDetail" DROP CONSTRAINT "custom_foreign_key";

-- AlterTable
ALTER TABLE "Calculator" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "LayerDetail" DROP COLUMN "formDataId",
DROP COLUMN "version",
ADD COLUMN     "calculatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PremiumDetail" DROP COLUMN "formDataId",
DROP COLUMN "version",
ADD COLUMN     "calculatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShareDetail" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "TreatyDetail" DROP COLUMN "formDataId",
DROP COLUMN "version",
ADD COLUMN     "calculatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TreatyDetailCurrent" ALTER COLUMN "currentMaintenance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TreatyDetailPrior" ALTER COLUMN "priorMaintenance" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "TreatyDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
