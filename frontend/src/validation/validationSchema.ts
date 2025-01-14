import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string().required("Statement Date is required"),
    inputOpeningfund: Yup.number().required("Opening Fund is required"),
    inputStatementPeriod: Yup.string().required("Statement Period is required"),
    inputTreatyYear: Yup.string().required("Treaty Year is required"),
    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            currentExchange: Yup.number().required("Exchange rate is required"),
            currentMargin: Yup.number().required("Margin is required"),
            currentBrokerage: Yup.number().required("Brokerage is required"),
            currentInterest: Yup.number().required("Interest rate is required"),
            currentLAP: Yup.number().required("LAP is required"),
            currentMaintenance: Yup.number().required("Maintenance is required"),
        }),
        treatyPriorYear: Yup.object({
            priorExchange: Yup.number().required("Exchange rate is required"),
            priorMargin: Yup.number().required("Margin is required"),
            priorBrokerage: Yup.number().required("Brokerage is required"),
            priorInterest: Yup.number().required("Interest rate is required"),
            priorLAP: Yup.number().required("LAP is required"),
            priorMaintenance: Yup.number().required("Maintenance is required"),
        }),
    }),
    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            pdmaDetailUsd: Yup.number().required("Value is required"),
            pdmaDetailIdr: Yup.number().required("Value is required"),
            pdmaDetailShare: Yup.number().required("Value is required"),
        }),
        layerMa: Yup.object({
            maDetailUsd: Yup.number().required("Value is required"),
            maDetailIdr: Yup.number().required("Value is required"),
            maDetailShare: Yup.number().required("Value is required"),
        }),
        layerAv: Yup.object({
            avDetailUsd: Yup.number().required("Value is required"),
            avDetailIdr: Yup.number().required("Value is required"),
            avDetailShare: Yup.number().required("Value is required"),
        }),
        layerLiability: Yup.object({
            liabilityDetailUsd: Yup.number().required("Value is required"),
            liabilityDetailIdr: Yup.number().required("Value is required"),
            liabilityDetailShare: Yup.number().required("Value is required"),
        }),
    }),
    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            pdmaPremiumUsd: Yup.number().required("Premium is required"),
            pdmaPremiumIdr: Yup.number().required("Premium is required"),
            pdmaPremiumShare: Yup.number().required("Premium is required"),
        }),
        premiumMa: Yup.object({
            maPremiumUsd: Yup.number().required("Premium is required"),
            maPremiumIdr: Yup.number().required("Premium is required"),
            maPremiumShare: Yup.number().required("Premium is required"),
        }),
        premiumAv: Yup.object({
            avPremiumUsd: Yup.number().required("Premium is required"),
            avPremiumIdr: Yup.number().required("Premium is required"),
            avPremiumShare: Yup.number().required("Premium is required"),
        }),
        premiumLiability: Yup.object({
            liabilityPremiumUsd: Yup.number().required("Premium is required"),
            liabilityPremiumIdr: Yup.number().required("Premium is required"),
            liabilityPremiumShare: Yup.number().required("Premium is required"),
        }),
    }),
    inputShare: Yup.object({
        sharePdma: Yup.object({
            pdmaShareUsd: Yup.number().required("Share is required"),
            pdmaShareIdr: Yup.number().required("Share is required"),
            pdmaSharePremiumUsd: Yup.number().required("Share is required"),
            pdmaSharePremiumIdr: Yup.number().required("Share is required"),
        }),
        shareMa: Yup.object({
            maShareUsd: Yup.number().required("Share is required"),
            maShareIdr: Yup.number().required("Share is required"),
            maSharePremiumUsd: Yup.number().required("Share is required"),
            maSharePremiumIdr: Yup.number().required("Share is required"),
        }),
        shareAv: Yup.object({
            avShareUsd: Yup.number().required("Share is required"),
            avShareIdr: Yup.number().required("Share is required"),
            avSharePremiumUsd: Yup.number().required("Share is required"),
            avSharePremiumIdr: Yup.number().required("Share is required"),
        }),
        shareLiability: Yup.object({
            liabilityShareUsd: Yup.number().required("Share is required"),
            liabilityShareIdr: Yup.number().required("Share is required"),
            liabilitySharePremiumUsd: Yup.number().required("Share is required"),
            liabilitySharePremiumIdr: Yup.number().required("Share is required"),
        }),
    }),
});
