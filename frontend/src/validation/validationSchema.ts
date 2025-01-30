import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string()
        .transform((val) => new Date(val).toISOString())
    .required("Tanggal statement wajib diisi"),
    inputOpeningfund: Yup.string().required("Opening fund wajib diisi"),
    inputStatementPeriod: Yup.string()
        .transform((val) => new Date(val).toISOString())
    .required("Periode statement wajib diisi"),
    inputTreatyYear: Yup.number().required("Tahun treaty wajib diisi"),

    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.number().required(),
            currentMargin: Yup.number().required(),
            currentBrokerage: Yup.number().required(),
            currentInterest: Yup.number().required(),
            currentLAP: Yup.number().required(),
            currentMaintenance: Yup.number().required(),
        }).optional(),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.number().required(),
            priorMargin: Yup.number().required(),
            priorBrokerage: Yup.number().required(),
            priorInterest: Yup.number().required(),
            priorLAP: Yup.number().required(),
            priorMaintenance: Yup.number().required(),
        }).optional(),
    }).optional(),

    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            pdmaDetailUsd: Yup.number().required(),
            pdmaDetailIdr: Yup.number().required(),
            pdmaDetailShare: Yup.number().required(),
        }).optional(),
        layerMa: Yup.object({
            maDetailUsd: Yup.number().required(),
            maDetailIdr: Yup.number().required(),
            maDetailShare: Yup.number().required(),
        }).optional(),
        layerAv: Yup.object({
            avDetailUsd: Yup.number().required(),
            avDetailIdr: Yup.number().required(),
            avDetailShare: Yup.number().required(),
        }).optional(),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.number().required(),
            liabilityDetailIdr: Yup.number().required(),
            liabilityDetailShare: Yup.number().required(),
        }).optional(),
    }).optional(),

    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            pdmaPremiumUsd: Yup.number().required(),
            pdmaPremiumIdr: Yup.number().required(),
            pdmaPremiumShare: Yup.number().required(),
        }).optional(),
        premiumMa: Yup.object({
            maPremiumUsd: Yup.number().required(),
            maPremiumIdr: Yup.number().required(),
            maPremiumShare: Yup.number().required(),
        }).optional(),
        premiumAv: Yup.object({
            avPremiumUsd: Yup.number().required(),
            avPremiumIdr: Yup.number().required(),
            avPremiumShare: Yup.number().required(),
        }).optional(),
        premiumLiability: Yup.object({
            liabilityPremiumUsd: Yup.number().required(),
            liabilityPremiumIdr: Yup.number().required(),
            liabilityPremiumShare: Yup.number().required(),
        }).optional(),
    }).optional(),

    inputShare: Yup.object({
        sharePdma: Yup.object({
            pdmaShareUsd: Yup.number().required(),
            pdmaShareIdr: Yup.number().required(),
            pdmaSharePremiumUsd: Yup.number().required(),
            pdmaSharePremiumIdr: Yup.number().required(),
        }).optional(),
        shareMa: Yup.object({
            maShareUsd: Yup.number().required(),
            maShareIdr: Yup.number().required(),
            maSharePremiumUsd: Yup.number().required(),
            maSharePremiumIdr: Yup.number().required(),
        }).optional(),
        shareAv: Yup.object({
            avShareUsd: Yup.number().required(),
            avShareIdr: Yup.number().required(),
            avSharePremiumUsd: Yup.number().required(),
            avSharePremiumIdr: Yup.number().required(),
        }).optional(),
        shareLiability: Yup.object({
            liabilityShareUsd: Yup.number().required(),
            liabilityShareIdr: Yup.number().required(),
            liabilitySharePremiumUsd: Yup.number().required(),
            liabilitySharePremiumIdr: Yup.number().required(),
        }).optional(),
    }).optional(),
});