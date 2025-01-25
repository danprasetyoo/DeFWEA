import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.date().required(),
    inputOpeningfund: Yup.string().required(),
    inputStatementPeriod: Yup.date().required(),
    inputTreatyYear: Yup.number().required(),

    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.string().required(),
            currentMargin: Yup.number().required(),
            currentBrokerage: Yup.number().required(),
            currentInterest: Yup.number().required(),
            currentLAP: Yup.number().required(),
            currentMaintenance: Yup.number().required(),
        }),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.string().required(),
            priorMargin: Yup.number().required(),
            priorBrokerage: Yup.number().required(),
            priorInterest: Yup.number().required(),
            priorLAP: Yup.number().required(),
            priorMaintenance: Yup.number().required(),
        }),
    }),

    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            pdmaDetailUsd: Yup.number().required(),
            pdmaDetailIdr: Yup.number().required(),
            pdmaDetailShare: Yup.number().required(),
        }),
        layerMa: Yup.object({
            maDetailUsd: Yup.number().required(),
            maDetailIdr: Yup.number().required(),
            maDetailShare: Yup.number().required(),
        }),
        layerAv: Yup.object({
            avDetailUsd: Yup.number().required(),
            avDetailIdr: Yup.number().required(),
            avDetailShare: Yup.number().required(),
        }),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.number().required(),
            liabilityDetailIdr: Yup.number().required(),
            liabilityDetailShare: Yup.number().required(),
        }),
    }),

    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            pdmaPremiumUsd: Yup.number().required(),
            pdmaPremiumIdr: Yup.number().required(),
            pdmaPremiumShare: Yup.number().required(),
        }),
        premiumMa: Yup.object({
            maPremiumUsd: Yup.number().required(),
            maPremiumIdr: Yup.number().required(),
            maPremiumShare: Yup.number().required(),
        }),
        premiumAv: Yup.object({
            avPremiumUsd: Yup.number().required(),
            avPremiumIdr: Yup.number().required(),
            avPremiumShare: Yup.number().required(),
        }),
        premiumLiability: Yup.object({
            liabilityPremiumUsd: Yup.number().required(),
            liabilityPremiumIdr: Yup.number().required(),
            liabilityPremiumShare: Yup.number().required(),
        }),
    }),

    inputShare: Yup.object({
        sharePdma: Yup.object({
            pdmaShareUsd: Yup.number().required(),
            pdmaShareIdr: Yup.number().required(),
            pdmaSharePremiumUsd: Yup.number().required(),
            pdmaSharePremiumIdr: Yup.number().required(),
        }),
        shareMa: Yup.object({
            maShareUsd: Yup.number().required(),
            maShareIdr: Yup.number().required(),
            maSharePremiumUsd: Yup.number().required(),
            maSharePremiumIdr: Yup.number().required(),
        }),
        shareAv: Yup.object({
            avShareUsd: Yup.number().required(),
            avShareIdr: Yup.number().required(),
            avSharePremiumUsd: Yup.number().required(),
            avSharePremiumIdr: Yup.number().required(),
        }),
        shareLiability: Yup.object({
            liabilityShareUsd: Yup.number().required(),
            liabilityShareIdr: Yup.number().required(),
            liabilitySharePremiumUsd: Yup.number().required(),
            liabilitySharePremiumIdr: Yup.number().required(),
        }),
    }),
});
