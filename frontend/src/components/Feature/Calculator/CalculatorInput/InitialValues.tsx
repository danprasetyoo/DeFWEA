const InitialValues = {
    inputStatementDate: "",
    inputOpeningfund: "",
    inputStatementPeriod: "",
    inputTreatyYear: "",

    inputTreatyDetail: {
        treatyCurrentYear: {
            currentExchange: "",
            currentMargin: 0,
            currentBrokerage: 0,
            currentInterest: 0,
            currentLAP: 0,
            currentMaintenance: 0,
        },
        treatyPriorYear: {
            priorExchange: "",
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