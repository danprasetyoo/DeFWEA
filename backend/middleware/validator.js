const { z } = require('zod');

const treatySchema = z.object({
    treatyCurrentYear: z.object({
        currentExchange: z.string().optional(),
        currentMargin: z.string().optional(),
        currentBrokerage: z.string().optional(),
        currentInterest: z.string().optional(),
        currentLAP: z.string().optional(),
        currentMaintenance: z.string().optional()
    }),
    treatyPriorYear: z.object({
        priorExchange: z.string().optional(),
        priorMargin: z.string().optional(),
        priorBrokerage: z.string().optional(),
        priorInterest: z.string().optional(),
        priorLAP: z.string().optional(),
        priorMaintenance: z.string().optional(),
    })
});

const layerSchema = z.object({
    layerPdma: z.object({
        pdmaLayerIdr: z.string().optional(),
        pdmaLayerShare: z.number().optional(),
        pdmaLayerUsd: z.string().optional(),
    }),
    layerMa: z.object({
        maLayerIdr: z.string().optional(),
        maLayerShare: z.number().optional(),
        maLayerUsd: z.string().optional(),
    }),
    layerAv: z.object({
        avLayerIdr: z.string().optional(),
        avLayerShare: z.number().optional(),
        avLayerUsd: z.string().optional(),
    }),
    layerLiability: z.object({
        liabilityLayerIdr: z.string().optional(),
        liabilityLayerShare: z.number().optional(),
        liabilityLayerUsd: z.string().optional(),
    })
});

const premiumSchema = z.object({
    premiumPdma: z.object({
        pdmaPremiumUsd: z.string().optional(),
        pdmaPremiumIdr: z.string().optional(),
        pdmaPremiumShare: z.string().optional(),
    }),
    premiumMa: z.object({
        maPremiumUsd: z.string().optional(),
        maPremiumIdr: z.string().optional(),
        maPremiumShare: z.string().optional(),
    }),
    premiumAv: z.object({
        avPremiumUsd: z.string().optional(),
        avPremiumIdr: z.string().optional(),
        avPremiumShare: z.string().optional(),
    }),
    premiumLiability: z.object({
        liabilityPremiumUsd: z.string().optional(),
        liabilityPremiumIdr: z.string().optional(),
        liabilityPremiumShare: z.string().optional(),
    }),
})

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
})

const calculatorSchema = z.object({
    inputStatementDate: z.string().nonempty().transform((val) => new Date(val)),
    inputOpeningfund: z.string().nonempty(),
    inputStatementPeriod: z.string().nonempty().transform((val) => new Date(val)),
    inputTreatyYear: z.string().nonempty(),
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
            details: err.errors,
        });
    }
};

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    next();
};

module.exports = { validateCalculator, validateId };
