import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string()
        .test('is-date', 'Invalid date format for inputStatementDate', (val) => {
            if (!val) return false; // Return false if val is undefined or empty
            return !isNaN(new Date(val).getTime());
        })
        .required("Tanggal statement wajib diisi"),
    inputOpeningfund: Yup.string().optional(),
    inputStatementPeriod: Yup.string()
        .test('is-date', 'Invalid date format for inputStatementPeriod', (val) => {
            if (!val) return false; // Return false if val is undefined or empty
            return !isNaN(new Date(val).getTime());
        })
        .required("Periode statement wajib diisi"),
    inputTreatyYear: Yup.string().required("Tahun treaty wajib diisi"),

    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.string().optional(),
            currentMargin: Yup.number().optional(),
            currentBrokerage: Yup.number().optional(),
            currentInterest: Yup.number().optional(),
            currentLAP: Yup.number().optional(),
            currentMaintenance: Yup.number().optional(),
        }).optional(),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.string().optional(),
            priorMargin: Yup.number().optional(),
            priorBrokerage: Yup.number().optional(),
            priorInterest: Yup.number().optional(),
            priorLAP: Yup.number().optional(),
            priorMaintenance: Yup.number().optional(),
        }).optional(),
    }).optional(),

    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            pdmaDetailUsd: Yup.number().optional(),
            pdmaDetailIdr: Yup.number().optional(),
            pdmaDetailShare: Yup.string().optional(),
        }).optional(),
        layerMa: Yup.object({
            maDetailUsd: Yup.number().optional(),
            maDetailIdr: Yup.number().optional(),
            maDetailShare: Yup.string().optional(),
        }).optional(),
        layerAv: Yup.object({
            avDetailUsd: Yup.number().optional(),
            avDetailIdr: Yup.number().optional(),
            avDetailShare: Yup.string().optional(),
        }).optional(),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.number().optional(),
            liabilityDetailIdr: Yup.number().optional(),
            liabilityDetailShare: Yup.string().optional(),
        }).optional(),
    }).optional(),

    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            pdmaPremiumUsd: Yup.number().optional(),
            pdmaPremiumIdr: Yup.number().optional(),
            pdmaPremiumShare: Yup.number().optional(),
        }).optional(),
        premiumMa: Yup.object({
            maPremiumUsd: Yup.number().optional(),
            maPremiumIdr: Yup.number().optional(),
            maPremiumShare: Yup.number().optional(),
        }).optional(),
        premiumAv: Yup.object({
            avPremiumUsd: Yup.number().optional(),
            avPremiumIdr: Yup.number().optional(),
            avPremiumShare: Yup.number().optional(),
        }).optional(),
        premiumLiability: Yup.object({
            liabilityPremiumUsd: Yup.number().optional(),
            liabilityPremiumIdr: Yup.number().optional(),
            liabilityPremiumShare: Yup.number().optional(),
        }).optional(),
    }).optional(),

    inputShare: Yup.object({
        sharePdma: Yup.object({
            pdmaShareUsd: Yup.number().optional(),
            pdmaShareIdr: Yup.number().optional(),
            pdmaSharePremiumUsd: Yup.number().optional(),
            pdmaSharePremiumIdr: Yup.number().optional(),
        }).optional(),
        shareMa: Yup.object({
            maShareUsd: Yup.number().optional(),
            maShareIdr: Yup.number().optional(),
            maSharePremiumUsd: Yup.number().optional(),
            maSharePremiumIdr: Yup.number().optional(),
        }).optional(),
        shareAv: Yup.object({
            avShareUsd: Yup.number().optional(),
            avShareIdr: Yup.number().optional(),
            avSharePremiumUsd: Yup.number().optional(),
            avSharePremiumIdr: Yup.number().optional(),
        }).optional(),
        shareLiability: Yup.object({
            liabilityShareUsd: Yup.number().optional(),
            liabilityShareIdr: Yup.number().optional(),
            liabilitySharePremiumUsd: Yup.number().optional(),
            liabilitySharePremiumIdr: Yup.number().optional(),
        }).optional(),
    }).optional(),
});