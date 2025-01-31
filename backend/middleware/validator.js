// validator.js
const { z } = require('zod');

const TreatyDetailSchema = z.object({
    treatyCurrentYear: z.object({
        currentExchange: z.number().optional(),
        currentMargin: z.number().optional(),
        currentBrokerage: z.number().optional(),
        currentInterest: z.number().optional(),
        currentLAP: z.number().optional(),
        currentMaintenance: z.number().optional(),
    }).optional(),
    treatyPriorYear: z.object({
        priorExchange: z.number().optional(),
        priorMargin: z.number().optional(),
        priorBrokerage: z.number().optional(),
        priorInterest: z.number().optional(),
        priorLAP: z.number().optional(),
        priorMaintenance: z.number().optional(),
    }).optional(),
});

const LayerDetailSchema = z.object({
    layerPdma: z.object({
        pdmaDetailUsd: z.number().optional(),
        pdmaDetailIdr: z.number().optional(),
        pdmaDetailShare: z.number().optional(),
    }).optional(),
    layerMa: z.object({
        maDetailUsd: z.number().optional(),
        maDetailIdr: z.number().optional(),
        maDetailShare: z.number().optional(),
    }).optional(),
    layerAv: z.object({
        avDetailUsd: z.number().optional(),
        avDetailIdr: z.number().optional(),
        avDetailShare: z.number().optional(),
    }).optional(),
    layerLiability: z.object({
        liabilityDetailUsd: z.number().optional(),
        liabilityDetailIdr: z.number().optional(),
        liabilityDetailShare: z.number().optional(),
    }).optional(),
});

const PremiumDetailSchema = z.object({
    premiumPdma: z.object({
        pdmaPremiumUsd: z.number().optional(),
        pdmaPremiumIdr: z.number().optional(),
        pdmaPremiumShare: z.number().optional(),
    }).optional(),
    premiumMa: z.object({
        maPremiumUsd: z.number().optional(),
        maPremiumIdr: z.number().optional(),
        maPremiumShare: z.number().optional(),
    }).optional(),
    premiumAv: z.object({
        avPremiumUsd: z.number().optional(),
        avPremiumIdr: z.number().optional(),
        avPremiumShare: z.number().optional(),
    }).optional(),
    premiumLiability: z.object({
        liabilityPremiumUsd: z.number().optional(),
        liabilityPremiumIdr: z.number().optional(),
        liabilityPremiumShare: z.number().optional(),
    }).optional(),
});

const ShareDetailSchema = z.object({
    sharePdma: z.object({
        pdmaShareUsd: z.number().optional(),
        pdmaShareIdr: z.number().optional(),
        pdmaSharePremiumUsd: z.number().optional(),
        pdmaSharePremiumIdr: z.number().optional(),
    }).optional(),
    shareMa: z.object({
        maShareUsd: z.number().optional(),
        maShareIdr: z.number().optional(),
        maSharePremiumUsd: z.number().optional(),
        maSharePremiumIdr: z.number().optional(),
    }).optional(),
    shareAv: z.object({
        avShareUsd: z.number().optional(),
        avShareIdr: z.number().optional(),
        avSharePremiumUsd: z.number().optional(),
        avSharePremiumIdr: z.number().optional(),
    }).optional(),
    shareLiability: z.object({
        liabilityShareUsd: z.number().optional(),
        liabilityShareIdr: z.number().optional(),
        liabilitySharePremiumUsd: z.number().optional(),
        liabilitySharePremiumIdr: z.number().optional(),
    }).optional(),
});

const CalculatorSchema = z.object({
    inputStatementDate: z.string().refine(val => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && val === date.toISOString().slice(0, 10); // Enforce YYYY-MM-DD
    }, {
        message: "Invalid date format. Use YYYY-MM-DD",
    }).transform(val => new Date(val)),
    inputOpeningfund: z.string(),
    inputStatementPeriod: z.string().refine(val => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && val === date.toISOString().slice(0, 10); // Enforce YYYY-MM-DD
    }, {
        message: "Invalid date format. Use YYYY-MM-DD",
    }).transform(val => new Date(val)),
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