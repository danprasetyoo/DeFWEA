const { z } = require('zod');

// Schema for TreatyDetailCurrent
const TreatyDetailCurrentSchema = z.object({
    currentExchange: z.string().optional(),
    currentMargin: z.number().optional(),
    currentBrokerage: z.number().optional(),
    currentInterest: z.number().optional(),
    currentLAP: z.number().optional(),
    currentMaintenance: z.number().optional(),
});

// Schema for TreatyDetailPrior
const TreatyDetailPriorSchema = z.object({
    priorExchange: z.string().optional(),
    priorMargin: z.number().optional(),
    priorBrokerage: z.number().optional(),
    priorInterest: z.number().optional(),
    priorLAP: z.number().optional(),
    priorMaintenance: z.number().optional(),
});

// Schema for TreatyDetail
const TreatyDetailSchema = z.object({
    treatyCurrentYear: TreatyDetailCurrentSchema.optional(),
    treatyPriorYear: TreatyDetailPriorSchema.optional(),
});

// Schema for PdmaDetailLayer
const PdmaDetailLayerSchema = z.object({
    pdmaDetailUsd: z.number().optional(),
    pdmaDetailIdr: z.number().optional(),
    pdmaDetailShare: z.number().optional(),
});

// Schema for MaDetailLayer
const MaDetailLayerSchema = z.object({
    maDetailUsd: z.number().optional(),
    maDetailIdr: z.number().optional(),
    maDetailShare: z.number().optional(),
});

// Schema for AvDetailLayer
const AvDetailLayerSchema = z.object({
    avDetailUsd: z.number().optional(),
    avDetailIdr: z.number().optional(),
    avDetailShare: z.number().optional(),
});

// Schema for LiabilityDetailLayer
const LiabilityDetailLayerSchema = z.object({
    liabilityDetailUsd: z.number().optional(),
    liabilityDetailIdr: z.number().optional(),
    liabilityDetailShare: z.number().optional(),
});

// Schema for LayerDetail
const LayerDetailSchema = z.object({
    pdmaLayer: PdmaDetailLayerSchema.optional(),
    maLayer: MaDetailLayerSchema.optional(),
    avLayer: AvDetailLayerSchema.optional(),
    liabilityLayer: LiabilityDetailLayerSchema.optional(),
});

// Schema for PdmaDetailPremium
const PdmaDetailPremiumSchema = z.object({
    pdmaPremiumUsd: z.number().optional(),
    pdmaPremiumIdr: z.number().optional(),
    pdmaPremiumShare: z.number().optional(),
});

// Schema for MaDetailPremium
const MaDetailPremiumSchema = z.object({
    maPremiumUsd: z.number().optional(),
    maPremiumIdr: z.number().optional(),
    maPremiumShare: z.number().optional(),
});

// Schema for AvDetailPremium
const AvDetailPremiumSchema = z.object({
    avPremiumUsd: z.number().optional(),
    avPremiumIdr: z.number().optional(),
    avPremiumShare: z.number().optional(),
});

// Schema for LiabilityDetailPremium
const LiabilityDetailPremiumSchema = z.object({
    liabilityPremiumUsd: z.number().optional(),
    liabilityPremiumIdr: z.number().optional(),
    liabilityPremiumShare: z.number().optional(),
});

// Schema for PremiumDetail
const PremiumDetailSchema = z.object({
    pdmaPremium: PdmaDetailPremiumSchema.optional(),
    maPremium: MaDetailPremiumSchema.optional(),
    avPremium: AvDetailPremiumSchema.optional(),
    liabilityPremium: LiabilityDetailPremiumSchema.optional(),
});

// Schema for PdmaDetailShare
const PdmaDetailShareSchema = z.object({
    pdmaShareUsd: z.number().optional(),
    pdmaShareIdr: z.number().optional(),
    pdmaSharePremiumUsd: z.number().optional(),
    pdmaSharePremiumIdr: z.number().optional(),
});

// Schema for MaDetailShare
const MaDetailShareSchema = z.object({
    maShareUsd: z.number().optional(),
    maShareIdr: z.number().optional(),
    maSharePremiumUsd: z.number().optional(),
    maSharePremiumIdr: z.number().optional(),
});

// Schema for AvDetailShare
const AvDetailShareSchema = z.object({
    avShareUsd: z.number().optional(),
    avShareIdr: z.number().optional(),
    avSharePremiumUsd: z.number().optional(),
    avSharePremiumIdr: z.number().optional(),
});

// Schema for LiabilityDetailShare
const LiabilityDetailShareSchema = z.object({
    liabilityShareUsd: z.number().optional(),
    liabilityShareIdr: z.number().optional(),
    liabilitySharePremiumUsd: z.number().optional(),
    liabilitySharePremiumIdr: z.number().optional(),
});

// Schema for ShareDetail
const ShareDetailSchema = z.object({
    pdmaShare: PdmaDetailShareSchema.optional(),
    maShare: MaDetailShareSchema.optional(),
    avShare: AvDetailShareSchema.optional(),
    liabilityShare: LiabilityDetailShareSchema.optional(),
});

// Main schema for Calculator
const CalculatorSchema = z.object({
    inputStatementDate: z.string().refine(val => !isNaN(new Date(val).getTime()), {
        message: "Invalid date format for inputStatementDate",
    }),
    inputOpeningfund: z.string().optional(),
    inputStatementPeriod: z.string().refine(val => !isNaN(new Date(val).getTime()), {
        message: "Invalid date format for inputStatementPeriod",
    }),
    inputTreatyYear: z.number(),
    inputTreatyDetail: TreatyDetailSchema.optional(),
    inputLayerDetail: LayerDetailSchema.optional(),
    inputPremiumDetail: PremiumDetailSchema.optional(),
    inputShareDetail: ShareDetailSchema.optional(),
});

const validateCalculator = (req, res, next) => {
    try {
        req.body = CalculatorSchema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({
            error: 'Invalid data',
            details: err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
    }
};

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
    }
    next();
};

module.exports = { CalculatorSchema, validateCalculator, validateId };
