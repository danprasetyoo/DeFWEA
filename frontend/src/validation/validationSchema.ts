import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string().notRequired(),
    inputOpeningfund: Yup.string().notRequired(),
    inputStatementPeriod: Yup.string().notRequired(),
    inputTreatyYear: Yup.string().notRequired(),

    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.string().notRequired(),
            currentMargin: Yup.string().notRequired(),
            currentBrokerage: Yup.string().notRequired(),
            currentInterest: Yup.string().notRequired(),
            currentLAP: Yup.string().notRequired(),
            currentMaintenance: Yup.string().notRequired(),
        }),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.string().notRequired(),
            priorMargin: Yup.string().notRequired(),
            priorBrokerage: Yup.string().notRequired(),
            priorInterest: Yup.string().notRequired(),
            priorLAP: Yup.string().notRequired(),
            priorMaintenance: Yup.string().notRequired(),
        }),
    }),

    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            pdmaDetailUsd: Yup.string().notRequired(),
            pdmaDetailIdr: Yup.string().notRequired(),
            pdmaDetailShare: Yup.string().notRequired(),
        }),
        layerMa: Yup.object({
            maDetailUsd: Yup.string().notRequired(),
            maDetailIdr: Yup.string().notRequired(),
            maDetailShare: Yup.string().notRequired(),
        }),
        layerAv: Yup.object({
            avDetailUsd: Yup.string().notRequired(),
            avDetailIdr: Yup.string().notRequired(),
            avDetailShare: Yup.string().notRequired(),
        }),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.string().notRequired(),
            liabilityDetailIdr: Yup.string().notRequired(),
            liabilityDetailShare: Yup.string().notRequired(),
        }),
    }),

    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            pdmaPremiumUsd: Yup.string().notRequired(),
            pdmaPremiumIdr: Yup.string().notRequired(),
            pdmaPremiumShare: Yup.string().notRequired(),
        }),
        premiumMa: Yup.object({
            maPremiumUsd: Yup.string().notRequired(),
            maPremiumIdr: Yup.string().notRequired(),
            maPremiumShare: Yup.string().notRequired(),
        }),
        premiumAv: Yup.object({
            avPremiumUsd: Yup.string().notRequired(),
            avPremiumIdr: Yup.string().notRequired(),
            avPremiumShare: Yup.string().notRequired(),
        }),
        premiumLiability: Yup.object({
            liabilityPremiumUsd: Yup.string().notRequired(),
            liabilityPremiumIdr: Yup.string().notRequired(),
            liabilityPremiumShare: Yup.string().notRequired(),
        }),
    }),

    inputShare: Yup.object({
        sharePdma: Yup.object({
            pdmaShareUsd: Yup.string().notRequired(),
            pdmaShareIdr: Yup.string().notRequired(),
            pdmaSharePremiumUsd: Yup.string().notRequired(),
            pdmaSharePremiumIdr: Yup.string().notRequired(),
        }),
        shareMa: Yup.object({
            maShareUsd: Yup.string().notRequired(),
            maShareIdr: Yup.string().notRequired(),
            maSharePremiumUsd: Yup.string().notRequired(),
            maSharePremiumIdr: Yup.string().notRequired(),
        }),
        shareAv: Yup.object({
            avShareUsd: Yup.string().notRequired(),
            avShareIdr: Yup.string().notRequired(),
            avSharePremiumUsd: Yup.string().notRequired(),
            avSharePremiumIdr: Yup.string().notRequired(),
        }),
        shareLiability: Yup.object({
            liabilityShareUsd: Yup.string().notRequired(),
            liabilityShareIdr: Yup.string().notRequired(),
            liabilitySharePremiumUsd: Yup.string().notRequired(),
            liabilitySharePremiumIdr: Yup.string().notRequired(),
        }),
    }),
});
