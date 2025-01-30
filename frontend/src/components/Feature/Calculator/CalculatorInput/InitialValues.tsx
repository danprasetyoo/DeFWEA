interface CalculatorFormValues {
    inputStatementDate: string;
    inputOpeningfund: string;
    inputStatementPeriod: string;
    inputTreatyYear: number;
    inputTreatyDetail: {
        treatyCurrentYear?: {
            currentExchange: number;
            currentMargin: number;
            currentBrokerage: number;
            currentInterest: number;
            currentLAP: number;
            currentMaintenance: number;
        };
        treatyPriorYear?: {
            priorExchange: number;
            priorMargin: number;
            priorBrokerage: number;
            priorInterest: number;
            priorLAP: number;
            priorMaintenance: number;
        };
    },

    inputLayerDetail: {
        layerPdma?: {
            pdmaDetailUsd: number;
            pdmaDetailIdr: number;
            pdmaDetailShare: number;
        },
        layerMa?: {
            maDetailUsd: number;
            maDetailIdr: number;
            maDetailShare: number;
        },
        layerAv?: {
            avDetailUsd: number;
            avDetailIdr: number;
            avDetailShare: number;
        },
        layerLiability?: {
            liabilityDetailUsd: number;
            liabilityDetailIdr: number;
            liabilityDetailShare: number;
        },
    },

    inputPremium: {
        premiumPdma?: {
            pdmaPremiumUsd: number;
            pdmaPremiumIdr: number;
            pdmaPremiumShare: number;
        },
        premiumMa?: {
            maPremiumUsd: number;
            maPremiumIdr: number;
            maPremiumShare: number;
        },
        premiumAv?: {
            avPremiumUsd: number;
            avPremiumIdr: number;
            avPremiumShare: number;
        },
        premiumLiability?: {
            liabilityPremiumUsd: number;
            liabilityPremiumIdr: number;
            liabilityPremiumShare: number;
        },
    },

    inputShare: {
        sharePdma?: {
            pdmaShareUsd: number;
            pdmaShareIdr: number;
            pdmaSharePremiumUsd: number;
            pdmaSharePremiumIdr: number;
        },
        shareMa?: {
            maShareUsd: number;
            maShareIdr: number;
            maSharePremiumUsd: number;
            maSharePremiumIdr: number;
        },
        shareAv?: {
            avShareUsd: number;
            avShareIdr: number;
            avSharePremiumUsd: number;
            avSharePremiumIdr: number;
        },
        shareLiability?: {
            liabilityShareUsd: number;
            liabilityShareIdr: number;
            liabilitySharePremiumUsd: number;
            liabilitySharePremiumIdr: number;
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
            currentExchange: 0,
            currentMargin: 0,
            currentBrokerage: 0,
            currentInterest: 0,
            currentLAP: 0,
            currentMaintenance: 0,
        },
        treatyPriorYear: {
            priorExchange: 0,
            priorMargin: 0,
            priorBrokerage: 0,
            priorInterest: 0,
            priorLAP: 0,
            priorMaintenance: 0,
        },
    },

    inputLayerDetail: {
        layerPdma: {
            pdmaDetailUsd: 0,
            pdmaDetailIdr: 0,
            pdmaDetailShare: 0,
        },
        layerMa: {
            maDetailUsd: 0,
            maDetailIdr: 0,
            maDetailShare: 0,
        },
        layerAv: {
            avDetailUsd: 0,
            avDetailIdr: 0,
            avDetailShare: 0,
        },
        layerLiability: {
            liabilityDetailUsd: 0,
            liabilityDetailIdr: 0,
            liabilityDetailShare: 0,
        },
    },

    inputPremium: {
        premiumPdma: {
            pdmaPremiumUsd: 0,
            pdmaPremiumIdr: 0,
            pdmaPremiumShare: 0,
        },
        premiumMa: {
            maPremiumUsd: 0,
            maPremiumIdr: 0,
            maPremiumShare: 0,
        },
        premiumAv: {
            avPremiumUsd: 0,
            avPremiumIdr: 0,
            avPremiumShare: 0,
        },
        premiumLiability: {
            liabilityPremiumUsd: 0,
            liabilityPremiumIdr: 0,
            liabilityPremiumShare: 0,
        },
    },

    inputShare: {
        sharePdma: {
            pdmaShareUsd: 0,
            pdmaShareIdr: 0,
            pdmaSharePremiumUsd: 0,
            pdmaSharePremiumIdr: 0,
        },
        shareMa: {
            maShareUsd: 0,
            maShareIdr: 0,
            maSharePremiumUsd: 0,
            maSharePremiumIdr: 0,
        },
        shareAv: {
            avShareUsd: 0,
            avShareIdr: 0,
            avSharePremiumUsd: 0,
            avSharePremiumIdr: 0,
        },
        shareLiability: {
            liabilityShareUsd: 0,
            liabilityShareIdr: 0,
            liabilitySharePremiumUsd: 0,
            liabilitySharePremiumIdr: 0,
        },
    },
};

export default InitialValues;