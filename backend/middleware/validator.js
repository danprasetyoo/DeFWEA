// validator.js
const { z } = require('zod');

const TreatyDetailSchema = z.object({
    treatyCurrentYear: z.object({
        currentExchange: z.number(),
        currentMargin: z.number(),
        currentBrokerage: z.number(),
        currentInterest: z.number(),
        currentLAP: z.number(),
        currentMaintenance: z.number(),
    }).optional(),
    treatyPriorYear: z.object({
        priorExchange: z.number(),
        priorMargin: z.number(),
        priorBrokerage: z.number(),
        priorInterest: z.number(),
        priorLAP: z.number(),
        priorMaintenance: z.number(),
    }).optional(),
});

const LayerDetailSchema = z.object({
    layerPdma: z.object({
        pdmaDetailUsd: z.number(),
        pdmaDetailIdr: z.number(),
        pdmaDetailShare: z.number(),
    }).optional(),
    layerMa: z.object({
        maDetailUsd: z.number(),
        maDetailIdr: z.number(),
        maDetailShare: z.number(),
    }).optional(),
    layerAv: z.object({
        avDetailUsd: z.number(),
        avDetailIdr: z.number(),
        avDetailShare: z.number(),
    }).optional(),
    layerLiability: z.object({
        liabilityDetailUsd: z.number(),
        liabilityDetailIdr: z.number(),
        liabilityDetailShare: z.number(),
    }).optional(),
});

const PremiumDetailSchema = z.object({
    premiumPdma: z.object({
        pdmaPremiumUsd: z.number(),
        pdmaPremiumIdr: z.number(),
        pdmaPremiumShare: z.number(),
    }).optional(),
    premiumMa: z.object({
        maPremiumUsd: z.number(),
        maPremiumIdr: z.number(),
        maPremiumShare: z.number(),
    }).optional(),
    premiumAv: z.object({
        avPremiumUsd: z.number(),
        avPremiumIdr: z.number(),
        avPremiumShare: z.number(),
    }).optional(),
    premiumLiability: z.object({
        liabilityPremiumUsd: z.number(),
        liabilityPremiumIdr: z.number(),
        liabilityPremiumShare: z.number(),
    }).optional(),
});

const ShareDetailSchema = z.object({
    sharePdma: z.object({
        pdmaShareUsd: z.number(),
        pdmaShareIdr: z.number(),
        pdmaSharePremiumUsd: z.number(),
        pdmaSharePremiumIdr: z.number(),
    }).optional(),
    shareMa: z.object({
        maShareUsd: z.number(),
        maShareIdr: z.number(),
        maSharePremiumUsd: z.number(),
        maSharePremiumIdr: z.number(),
    }).optional(),
    shareAv: z.object({
        avShareUsd: z.number(),
        avShareIdr: z.number(),
        avSharePremiumUsd: z.number(),
        avSharePremiumIdr: z.number(),
    }).optional(),
    shareLiability: z.object({
        liabilityShareUsd: z.number(),
        liabilityShareIdr: z.number(),
        liabilitySharePremiumUsd: z.number(),
        liabilitySharePremiumIdr: z.number(),
    }).optional(),
});

const CalculatorSchema = z.object({
    inputStatementDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    inputOpeningfund: z.string(),
    inputStatementPeriod: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    inputTreatyYear: z.number(),
    inputTreatyDetail: TreatyDetailSchema.optional(),
    inputLayerDetail: LayerDetailSchema.optional(),
    inputPremium: PremiumDetailSchema.optional(),
    inputShare: ShareDetailSchema.optional(),
});

module.exports = {
    CalculatorSchema,
    TreatyDetailSchema,
    LayerDetailSchema,
    PremiumDetailSchema,
    ShareDetailSchema
};