import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string()
        .required("Tanggal statement wajib diisi")
        .transform((val) => {
          const date = new Date(val);
          if (isNaN(date.getTime()) || val !== date.toISOString().slice(0, 10)) {
            throw new Yup.ValidationError("Invalid date format. Use YYYY-MM-DD", val, "inputStatementDate");
          }
          return date; // Return Date object
        }),
    inputOpeningfund: Yup.string().required("Opening fund wajib diisi"),
    inputStatementPeriod: Yup.string()
        .required("Periode statement wajib diisi")
        .transform((val) => {
          const date = new Date(val);
          if (isNaN(date.getTime()) || val !== date.toISOString().slice(0, 10)) {
            throw new Yup.ValidationError("Invalid date format. Use YYYY-MM-DD", val, "inputStatementPeriod");
          }
          return date; // Return Date object
        }),
    inputTreatyYear: Yup.number().required("Tahun treaty wajib diisi"),

    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.number().optional(),
            currentMargin: Yup.number().optional(),
            currentBrokerage: Yup.number().optional(),
            currentInterest: Yup.number().optional(),
            currentLAP: Yup.number().optional(),
            currentMaintenance: Yup.number().optional(),
        }).optional(),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.number().optional(),
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
            pdmaDetailShare: Yup.number().optional(),
        }).optional(),
        layerMa: Yup.object({
            maDetailUsd: Yup.number().optional(),
            maDetailIdr: Yup.number().optional(),
            maDetailShare: Yup.number().optional(),
        }).optional(),
        layerAv: Yup.object({
            avDetailUsd: Yup.number().optional(),
            avDetailIdr: Yup.number().optional(),
            avDetailShare: Yup.number().optional(),
        }).optional(),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.number().optional(),
            liabilityDetailIdr: Yup.number().optional(),
            liabilityDetailShare: Yup.number().optional(),
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