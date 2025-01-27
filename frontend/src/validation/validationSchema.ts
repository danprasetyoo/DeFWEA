import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.date().required("Tanggal statement wajib diisi"),
    inputOpeningfund: Yup.string().required("Opening fund wajib diisi"),
    inputStatementPeriod: Yup.date().required("Periode statement wajib diisi"),
    inputTreatyYear: Yup.number().required("Tahun treaty wajib diisi"),

    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.string().notRequired(),
            currentMargin: Yup.number().notRequired(),
            currentBrokerage: Yup.number().notRequired(),
            currentInterest: Yup.number().notRequired(),
            currentLAP: Yup.number().notRequired(),
            currentMaintenance: Yup.number().notRequired(),
        }),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.string().notRequired(),
            priorMargin: Yup.number().notRequired(),
            priorBrokerage: Yup.number().notRequired(),
            priorInterest: Yup.number().notRequired(),
            priorLAP: Yup.number().notRequired(),
            priorMaintenance: Yup.number().notRequired(),
        }),
    }),

    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            pdmaDetailUsd: Yup.number().notRequired(),
            pdmaDetailIdr: Yup.number().notRequired(),
            pdmaDetailShare: Yup.number().notRequired(),
        }),
        layerMa: Yup.object({
            maDetailUsd: Yup.number().notRequired(),
            maDetailIdr: Yup.number().notRequired(),
            maDetailShare: Yup.number().notRequired(),
        }),
        layerAv: Yup.object({
            avDetailUsd: Yup.number().notRequired(),
            avDetailIdr: Yup.number().notRequired(),
            avDetailShare: Yup.number().notRequired(),
        }),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.number().notRequired(),
            liabilityDetailIdr: Yup.number().notRequired(),
            liabilityDetailShare: Yup.number().notRequired(),
        }),
    }),

    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            pdmaPremiumUsd: Yup.number().notRequired(),
            pdmaPremiumIdr: Yup.number().notRequired(),
            pdmaPremiumShare: Yup.number().notRequired(),
        }),
        premiumMa: Yup.object({
            maPremiumUsd: Yup.number().notRequired(),
            maPremiumIdr: Yup.number().notRequired(),
            maPremiumShare: Yup.number().notRequired(),
        }),
        premiumAv: Yup.object({
            avPremiumUsd: Yup.number().notRequired(),
            avPremiumIdr: Yup.number().notRequired(),
            avPremiumShare: Yup.number().notRequired(),
        }),
        premiumLiability: Yup.object({
            liabilityPremiumUsd: Yup.number().notRequired(),
            liabilityPremiumIdr: Yup.number().notRequired(),
            liabilityPremiumShare: Yup.number().notRequired(),
        }),
    }),

    inputShare: Yup.object({
        sharePdma: Yup.object({
            pdmaShareUsd: Yup.number().notRequired(),
            pdmaShareIdr: Yup.number().notRequired(),
            pdmaSharePremiumUsd: Yup.number().notRequired(),
            pdmaSharePremiumIdr: Yup.number().notRequired(),
        }),
        shareMa: Yup.object({
            maShareUsd: Yup.number().notRequired(),
            maShareIdr: Yup.number().notRequired(),
            maSharePremiumUsd: Yup.number().notRequired(),
            maSharePremiumIdr: Yup.number().notRequired(),
        }),
        shareAv: Yup.object({
            avShareUsd: Yup.number().notRequired(),
            avShareIdr: Yup.number().notRequired(),
            avSharePremiumUsd: Yup.number().notRequired(),
            avSharePremiumIdr: Yup.number().notRequired(),
        }),
        shareLiability: Yup.object({
            liabilityShareUsd: Yup.number().notRequired(),
            liabilityShareIdr: Yup.number().notRequired(),
            liabilitySharePremiumUsd: Yup.number().notRequired(),
            liabilitySharePremiumIdr: Yup.number().notRequired(),
        }),
    }),
});