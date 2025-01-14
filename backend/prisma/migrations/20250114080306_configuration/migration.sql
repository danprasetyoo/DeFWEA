-- CreateTable
CREATE TABLE "Calculator" (
    "id" SERIAL NOT NULL,
    "inputStatementDate" TIMESTAMP(3) NOT NULL,
    "inputOpeningfund" TEXT NOT NULL,
    "inputStatementPeriod" TIMESTAMP(3) NOT NULL,
    "inputTreatyYear" INTEGER NOT NULL,

    CONSTRAINT "Calculator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatyDetail" (
    "id" SERIAL NOT NULL,
    "formDataId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "TreatyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatyDetailCurrent" (
    "id" SERIAL NOT NULL,
    "currentExchange" INTEGER NOT NULL,
    "currentMargin" DOUBLE PRECISION NOT NULL,
    "currentBrokerage" DOUBLE PRECISION NOT NULL,
    "currentInterest" DOUBLE PRECISION NOT NULL,
    "currentLAP" DOUBLE PRECISION NOT NULL,
    "currentMaintenance" DOUBLE PRECISION NOT NULL,
    "treatyDetailId" INTEGER NOT NULL,

    CONSTRAINT "treatyDetailCurrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatyDetailPrior" (
    "id" SERIAL NOT NULL,
    "priorExchange" INTEGER NOT NULL,
    "priorMargin" DOUBLE PRECISION NOT NULL,
    "priorBrokerage" DOUBLE PRECISION NOT NULL,
    "priorInterest" DOUBLE PRECISION NOT NULL,
    "priorLAP" DOUBLE PRECISION NOT NULL,
    "priorMaintenance" DOUBLE PRECISION NOT NULL,
    "treatyDetailId" INTEGER NOT NULL,

    CONSTRAINT "treatyDetailPrior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayerDetail" (
    "id" SERIAL NOT NULL,
    "formDataId" INTEGER NOT NULL,
    "pdmaLayerId" INTEGER NOT NULL,
    "maLayerId" INTEGER NOT NULL,
    "avLayerId" INTEGER NOT NULL,
    "liabilityLayerId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "LayerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdmaDetailLayer" (
    "id" SERIAL NOT NULL,
    "pdmaDetailUsd" INTEGER NOT NULL,
    "pdmaDetailIdr" INTEGER NOT NULL,
    "pdmaDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "pdmaDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maDetailLayer" (
    "id" SERIAL NOT NULL,
    "maDetailUsd" INTEGER NOT NULL,
    "maDetailIdr" INTEGER NOT NULL,
    "maDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "maDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avDetailLayer" (
    "id" SERIAL NOT NULL,
    "avDetailUsd" INTEGER NOT NULL,
    "avDetailIdr" INTEGER NOT NULL,
    "avDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "avDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liabilityDetailLayer" (
    "id" SERIAL NOT NULL,
    "liabilityDetailUsd" INTEGER NOT NULL,
    "liabilityDetailIdr" INTEGER NOT NULL,
    "liabilityDetailShare" DOUBLE PRECISION NOT NULL,
    "layerDetailId" INTEGER NOT NULL,

    CONSTRAINT "liabilityDetailLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremiumDetail" (
    "id" SERIAL NOT NULL,
    "formDataId" INTEGER NOT NULL,
    "pdmaPremiumId" INTEGER NOT NULL,
    "maPremiumId" INTEGER NOT NULL,
    "avPremiumId" INTEGER NOT NULL,
    "liabilityPremiumId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "PremiumDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdmaDetailPremium" (
    "id" SERIAL NOT NULL,
    "pdmaPremiumUsd" INTEGER NOT NULL,
    "pdmaPremiumIdr" INTEGER NOT NULL,
    "pdmaPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "pdmaDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maDetailPremium" (
    "id" SERIAL NOT NULL,
    "maPremiumUsd" INTEGER NOT NULL,
    "maPremiumIdr" INTEGER NOT NULL,
    "maPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "maDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avDetailPremium" (
    "id" SERIAL NOT NULL,
    "avPremiumUsd" INTEGER NOT NULL,
    "avPremiumIdr" INTEGER NOT NULL,
    "avPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "avDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liabilityDetailPremium" (
    "id" SERIAL NOT NULL,
    "liabilityPremiumUsd" INTEGER NOT NULL,
    "liabilityPremiumIdr" INTEGER NOT NULL,
    "liabilityPremiumShare" DOUBLE PRECISION NOT NULL,
    "premiumDetailId" INTEGER,

    CONSTRAINT "liabilityDetailPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShareDetail" (
    "id" SERIAL NOT NULL,
    "pdmaShareId" INTEGER NOT NULL,
    "maShareId" INTEGER NOT NULL,
    "avShareId" INTEGER NOT NULL,
    "liabilityShareId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "calculatorId" INTEGER NOT NULL,

    CONSTRAINT "ShareDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdmaDetailShare" (
    "id" SERIAL NOT NULL,
    "pdmaShareUsd" INTEGER NOT NULL,
    "pdmaShareIdr" INTEGER NOT NULL,
    "pdmaSharePremiumUsd" INTEGER NOT NULL,
    "pdmaSharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "pdmaDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maDetailShare" (
    "id" SERIAL NOT NULL,
    "maShareUsd" INTEGER NOT NULL,
    "maShareIdr" INTEGER NOT NULL,
    "maSharePremiumUsd" INTEGER NOT NULL,
    "maSharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "maDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avDetailShare" (
    "id" SERIAL NOT NULL,
    "avShareUsd" INTEGER NOT NULL,
    "avShareIdr" INTEGER NOT NULL,
    "avSharePremiumUsd" INTEGER NOT NULL,
    "avSharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "avDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liabilityDetailShare" (
    "id" SERIAL NOT NULL,
    "liabilityShareUsd" INTEGER NOT NULL,
    "liabilityShareIdr" INTEGER NOT NULL,
    "liabilitySharePremiumUsd" INTEGER NOT NULL,
    "liabilitySharePremiumIdr" INTEGER NOT NULL,
    "shareDetailId" INTEGER NOT NULL,

    CONSTRAINT "liabilityDetailShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "treatyDetailCurrent_treatyDetailId_key" ON "treatyDetailCurrent"("treatyDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "treatyDetailPrior_treatyDetailId_key" ON "treatyDetailPrior"("treatyDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_pdmaLayerId_key" ON "LayerDetail"("pdmaLayerId");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_maLayerId_key" ON "LayerDetail"("maLayerId");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_avLayerId_key" ON "LayerDetail"("avLayerId");

-- CreateIndex
CREATE UNIQUE INDEX "LayerDetail_liabilityLayerId_key" ON "LayerDetail"("liabilityLayerId");

-- CreateIndex
CREATE UNIQUE INDEX "PremiumDetail_pdmaPremiumId_key" ON "PremiumDetail"("pdmaPremiumId");

-- CreateIndex
CREATE UNIQUE INDEX "PremiumDetail_maPremiumId_key" ON "PremiumDetail"("maPremiumId");

-- CreateIndex
CREATE UNIQUE INDEX "PremiumDetail_avPremiumId_key" ON "PremiumDetail"("avPremiumId");

-- CreateIndex
CREATE UNIQUE INDEX "PremiumDetail_liabilityPremiumId_key" ON "PremiumDetail"("liabilityPremiumId");

-- CreateIndex
CREATE UNIQUE INDEX "ShareDetail_pdmaShareId_key" ON "ShareDetail"("pdmaShareId");

-- CreateIndex
CREATE UNIQUE INDEX "ShareDetail_maShareId_key" ON "ShareDetail"("maShareId");

-- CreateIndex
CREATE UNIQUE INDEX "ShareDetail_avShareId_key" ON "ShareDetail"("avShareId");

-- CreateIndex
CREATE UNIQUE INDEX "ShareDetail_liabilityShareId_key" ON "ShareDetail"("liabilityShareId");

-- AddForeignKey
ALTER TABLE "TreatyDetail" ADD CONSTRAINT "custom_foreign_key" FOREIGN KEY ("formDataId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatyDetailCurrent" ADD CONSTRAINT "treatyDetailCurrent_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatyDetailPrior" ADD CONSTRAINT "treatyDetailPrior_treatyDetailId_fkey" FOREIGN KEY ("treatyDetailId") REFERENCES "TreatyDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_formDataId_fkey" FOREIGN KEY ("formDataId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_pdmaLayerId_fkey" FOREIGN KEY ("pdmaLayerId") REFERENCES "pdmaDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_maLayerId_fkey" FOREIGN KEY ("maLayerId") REFERENCES "maDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_avLayerId_fkey" FOREIGN KEY ("avLayerId") REFERENCES "avDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayerDetail" ADD CONSTRAINT "LayerDetail_liabilityLayerId_fkey" FOREIGN KEY ("liabilityLayerId") REFERENCES "liabilityDetailLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_formDataId_fkey" FOREIGN KEY ("formDataId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_pdmaPremiumId_fkey" FOREIGN KEY ("pdmaPremiumId") REFERENCES "pdmaDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_maPremiumId_fkey" FOREIGN KEY ("maPremiumId") REFERENCES "maDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_avPremiumId_fkey" FOREIGN KEY ("avPremiumId") REFERENCES "avDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PremiumDetail" ADD CONSTRAINT "PremiumDetail_liabilityPremiumId_fkey" FOREIGN KEY ("liabilityPremiumId") REFERENCES "liabilityDetailPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_pdmaShareId_fkey" FOREIGN KEY ("pdmaShareId") REFERENCES "pdmaDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_maShareId_fkey" FOREIGN KEY ("maShareId") REFERENCES "maDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_avShareId_fkey" FOREIGN KEY ("avShareId") REFERENCES "avDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_liabilityShareId_fkey" FOREIGN KEY ("liabilityShareId") REFERENCES "liabilityDetailShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareDetail" ADD CONSTRAINT "ShareDetail_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
