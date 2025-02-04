interface CalculatorFormValues {
    inputStatementDate: string;
    inputOpeningfund: string;
    inputStatementPeriod: string;
    inputTreatyYear: number;
    inputTreatyDetail: {
        treatyCurrentYear?: {
            Exchange: number;
            Margin: number;
            Brokerage: number;
            Interest: number;
            LAP: number;
            Maintenance: number;
        };
        treatyPriorYear?: {
            Exchange: number;
            Margin: number;
            Brokerage: number;
            Interest: number;
            LAP: number;
            Maintenance: number;
        };
    },

    inputLayerDetail: {
        layerPdma?: {
            detailUsd: number;
            detailIdr: number;
            detailShare: number;
        },
        layerMa?: {
            detailUsd: number;
            detailIdr: number;
            detailShare: number;
        },
        layerAv?: {
            detailUsd: number;
            detailIdr: number;
            detailShare: number;
        },
        layerLiability?: {
            detailUsd: number;
            detailIdr: number;
            detailShare: number;
        },
    },

    inputPremium: {
        premiumPdma?: {
            premiumUsd: number;
            premiumIdr: number;
            premiumShare: number;
        },
        premiumMa?: {
            premiumUsd: number;
            premiumIdr: number;
            premiumShare: number;
        },
        premiumAv?: {
            premiumUsd: number;
            premiumIdr: number;
            premiumShare: number;
        },
        premiumLiability?: {
            premiumUsd: number;
            premiumIdr: number;
            premiumShare: number;
        },
    },

    inputShare: {
        sharePdma?: {
            shareUsd: number;
            shareIdr: number;
            sharePremiumUsd: number;
            sharePremiumIdr: number;
        },
        shareMa?: {
            shareUsd: number;
            shareIdr: number;
            sharePremiumUsd: number;
            sharePremiumIdr: number;
        },
        shareAv?: {
            shareUsd: number;
            shareIdr: number;
            sharePremiumUsd: number;
            sharePremiumIdr: number;
        },
        shareLiability?: {
            shareUsd: number;
            shareIdr: number;
            sharePremiumUsd: number;
            sharePremiumIdr: number;
        },
    },
}


const InitialValues: CalculatorFormValues = {
    inputStatementDate: "",
    inputOpeningfund: "",
    inputStatementPeriod: "",
    inputTreatyYear: 0,
    inputTreatyDetail: {
        treatyCurrentYear: {
            Exchange: 0, // Corrected names
            Margin: 0,
            Brokerage: 0,
            Interest: 0,
            LAP: 0,
            Maintenance: 0,
        },
        treatyPriorYear: {
            Exchange: 0,
            Margin: 0,
            Brokerage: 0,
            Interest: 0,
            LAP: 0,
            Maintenance: 0,
        },
    },
    inputLayerDetail: {
        layerPdma: {
            detailUsd: 0,  // Corrected names
            detailIdr: 0,
            detailShare: 0,
        },
        layerMa: {
            detailUsd: 0,
            detailIdr: 0,
            detailShare: 0,
        },
        layerAv: {
            detailUsd: 0,
            detailIdr: 0,
            detailShare: 0,
        },
        layerLiability: {
            detailUsd: 0,
            detailIdr: 0,
            detailShare: 0,
        },
    },
    inputPremium: {  // Corrected names throughout
        premiumPdma: {
            premiumUsd: 0,
            premiumIdr: 0,
            premiumShare: 0,
        },
        premiumMa: {
            premiumUsd: 0,
            premiumIdr: 0,
            premiumShare: 0,
        },
        premiumAv: {
            premiumUsd: 0,
            premiumIdr: 0,
            premiumShare: 0,
        },
        premiumLiability: {
            premiumUsd: 0,
            premiumIdr: 0,
            premiumShare: 0,
        },
    },
    inputShare: { // Corrected names throughout
        sharePdma: {
            shareUsd: 0,
            shareIdr: 0,
            sharePremiumUsd: 0,
            sharePremiumIdr: 0,
        },
        shareMa: {
            shareUsd: 0,
            shareIdr: 0,
            sharePremiumUsd: 0,
            sharePremiumIdr: 0,
        },
        shareAv: {
            shareUsd: 0,
            shareIdr: 0,
            sharePremiumUsd: 0,
            sharePremiumIdr: 0,
        },
        shareLiability: {
            shareUsd: 0,
            shareIdr: 0,
            sharePremiumUsd: 0,
            sharePremiumIdr: 0,
        },
    },
};

export default InitialValues;