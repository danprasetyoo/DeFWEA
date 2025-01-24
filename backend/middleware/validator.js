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
        currentMaintenance: z.string().optional()
    }),
    treatyPriorYear: z.object({
        priorExchange: z.string().optional(),
        priorMargin: z.number().optional(),
        priorBrokerage: z.number().optional(),
        priorInterest: z.number().optional(),
        priorLAP: z.number().optional(),
        priorMaintenance: z.string().optional(),
    })
});

const layerSchema = z.object({
    layerPdma: z.object({
        pdmaLayerIdr: z.string().optional(),
        pdmaLayerShare: parseNumber,
        pdmaLayerUsd: z.string().optional(),
    }),
    layerMa: z.object({
        maLayerIdr: z.string().optional(),
        maLayerShare: parseNumber,
        maLayerUsd: z.string().optional(),
    }),
    layerAv: z.object({
        avLayerIdr: z.string().optional(),
        avLayerShare: parseNumber,
        avLayerUsd: z.string().optional(),
    }),
    layerLiability: z.object({
        liabilityLayerIdr: z.string().optional(),
        liabilityLayerShare: parseNumber,
        liabilityLayerUsd: z.string().optional(),
    })
});

const premiumSchema = z.object({
    premiumPdma: z.object({
        pdmaPremiumUsd: z.string().optional(),
        pdmaPremiumIdr: z.string().optional(),
        pdmaPremiumShare: z.number().optional(),
    }),
    premiumMa: z.object({
        maPremiumUsd: z.string().optional(),
        maPremiumIdr: z.string().optional(),
        maPremiumShare: z.number().optional(),
    }),
    premiumAv: z.object({
        avPremiumUsd: z.string().optional(),
        avPremiumIdr: z.string().optional(),
        avPremiumShare: z.number().optional(),
    }),
    premiumLiability: z.object({
        liabilityPremiumUsd: z.string().optional(),
        liabilityPremiumIdr: z.string().optional(),
        liabilityPremiumShare: z.number().optional(),
    }),
});

const shareSchema = z.object({
    sharePdma: z.object({
        pdmaShareUsd: z.string().optional(),
        pdmaShareIdr: z.string().optional(),
        pdmaSharePremiumUsd: z.string().optional(),
        pdmaSharePremiumIdr: z.string().optional(),
    }),
    shareMa: z.object({
        maShareUsd: z.string().optional(),
        maShareIdr: z.string().optional(),
        maSharePremiumUsd: z.string().optional(),
        maSharePremiumIdr: z.string().optional(),
    }),
    shareAv: z.object({
        avShareUsd: z.string().optional(),
        avShareIdr: z.string().optional(),
        avSharePremiumUsd: z.string().optional(),
        avSharePremiumIdr: z.string().optional(),
    }),
    shareLiability: z.object({
        liabilityShareUsd: z.string().optional(),
        liabilityShareIdr: z.string().optional(),
        liabilitySharePremiumUsd: z.string().optional(),
        liabilitySharePremiumIdr: z.string().optional(),
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