const { z } = require('zod');

const parseNumber = z.string().optional().transform(val => (val ? parseFloat(val) : undefined));
const parseDate = z.string().nonempty().transform(val => {
    const date = new Date(val);
    if (isNaN(date)) throw new Error("Invalid date format");
    return date;
});

const treatySchema = z.object({
    treatyCurrentYear: z.object({
        currentExchange: z.string().optional(),
        currentMargin: z.number().optional(),
        currentBrokerage: z.number().optional(),
        currentInterest: z.number().optional(),
        currentLAP: z.number().optional(),
        currentMaintenance: z.number().optional()
    }),
    treatyPriorYear: z.object({
        priorExchange: z.string().optional(),
        priorMargin: z.number().optional(),
        priorBrokerage: z.number().optional(),
        priorInterest: z.number().optional(),
        priorLAP: z.number().optional(),
        priorMaintenance: z.number().optional(),
    })
});

const layerSchema = z.object({
    layerPdma: z.object({
        pdmaDetailUsd: z.number().optional(),
        pdmaDetailIdr: z.number().optional(),
        pdmaDetailShare: z.number().optional(),
    }),
    layerMa: z.object({
        maDetailUsd: z.number().optional(),
        maDetailIdr: z.number().optional(),
        maDetailShare: z.number().optional(),
    }),
    layerAv: z.object({
        avDetailUsd: z.number().optional(),
        avDetailIdr: z.number().optional(),
        avDetailShare: z.number().optional(),
    }),
    layerLiability: z.object({
        liabilityDetailUsd: z.number().optional(),
        liabilityDetailIdr: z.number().optional(),
        liabilityDetailShare: z.number().optional(),
    })
});

const premiumSchema = z.object({
    premiumPdma: z.object({
        pdmaPremiumUsd: z.number().optional(),
        pdmaPremiumIdr: z.number().optional(),
        pdmaPremiumShare: z.number().optional(),
    }),
    premiumMa: z.object({
        maPremiumUsd: z.number().optional(),
        maPremiumIdr: z.number().optional(),
        maPremiumShare: z.number().optional(),
    }),
    premiumAv: z.object({
        avPremiumUsd: z.number().optional(),
        avPremiumIdr: z.number().optional(),
        avPremiumShare: z.number().optional(),
    }),
    premiumLiability: z.object({
        liabilityPremiumUsd: z.number().optional(),
        liabilityPremiumIdr: z.number().optional(),
        liabilityPremiumShare: z.number().optional(),
    }),
});

const shareSchema = z.object({
    sharePdma: z.object({
        pdmaShareUsd: z.number().optional(),
        pdmaShareIdr: z.number().optional(),
        pdmaSharePremiumUsd: z.number().optional(),
        pdmaSharePremiumIdr: z.number().optional(),
    }),
    shareMa: z.object({
        maShareUsd: z.number().optional(),
        maShareIdr: z.number().optional(),
        maSharePremiumUsd: z.number().optional(),
        maSharePremiumIdr: z.number().optional(),
    }),
    shareAv: z.object({
        avShareUsd: z.number().optional(),
        avShareIdr: z.number().optional(),
        avSharePremiumUsd: z.number().optional(),
        avSharePremiumIdr: z.number().optional(),
    }),
    shareLiability: z.object({
        liabilityShareUsd: z.number().optional(),
        liabilityShareIdr: z.number().optional(),
        liabilitySharePremiumUsd: z.number().optional(),
        liabilitySharePremiumIdr: z.number().optional(),
    }),
});

const calculatorSchema = z.object({
    inputStatementDate: parseDate,
    inputOpeningfund: z.string().optional(),
    inputStatementPeriod: parseDate,
    inputTreatyYear: z.number().optional(),
    inputTreatyDetail: treatySchema,
    inputLayerDetail: layerSchema,
    inputPremium: premiumSchema,
    inputShare: shareSchema,
});

const validateCalculator = (req, res, next) => {
    try {
        req.body = calculatorSchema.parse(req.body);
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

module.exports = { validateCalculator, validateId };