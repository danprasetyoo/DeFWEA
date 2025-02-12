export interface CalculatorPayload {
    inputStatementDate?: string;
    inputOpeningfund?: string;
    inputStatementPeriod?: string;
    inputTreatyYear?: number;
    inputTreatyDetail?: {
        treatyCurrentYear?: AmountDetail;
        treatyPriorYear?: AmountDetail;
    };
    inputLayerDetail?: {
        layerPdma?: LayerAmountDetail;
        layerMa?: LayerAmountDetail;
        layerAv?: LayerAmountDetail;
        layerLiability?: LayerAmountDetail;
    };
    inputPremium?: {
        premiumPdma?: LayerAmountDetail;
        premiumMa?: LayerAmountDetail;
        premiumAv?: LayerAmountDetail;
        premiumLiability?: LayerAmountDetail;
    };
    inputShare?: {
        sharePdma?: ShareDetail;
        shareMa?: ShareDetail;
        shareAv?: ShareDetail;
        shareLiability?: ShareDetail;
    };
}

interface AmountDetail {
    Exchange?: number | undefined;
    Margin?: number | undefined;
    Brokerage?: number | undefined;
    Interest?: number | undefined;
    LAP?: number | undefined;
    Maintenance?: number | undefined;
}

interface LayerAmountDetail {
    detailUsd?: number | undefined;
    detailIdr?: number | undefined;
    detailShare?: number | undefined;
}

interface ShareDetail {
    shareUsd?: number | undefined;
    shareIdr?: number | undefined;
    sharePremiumUsd?: number | undefined;
    sharePremiumIdr?: number | undefined;
}

const initialValues: CalculatorPayload = {
    inputStatementDate: "",
    inputOpeningfund: "",
    inputStatementPeriod: "",
    inputTreatyYear: undefined,
    inputTreatyDetail: {
        treatyCurrentYear: {
            Exchange: undefined,
            Margin: undefined,
            Brokerage: undefined,
            Interest: undefined,
            LAP: undefined,
            Maintenance: undefined,
        },
        treatyPriorYear: {
            Exchange: undefined,
            Margin: undefined,
            Brokerage: undefined,
            Interest: undefined,
            LAP: undefined,
            Maintenance: undefined,
        },
    },
    inputLayerDetail: {
        layerPdma: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        layerMa: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        layerAv: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        layerLiability: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
    },
    inputPremium: {
        premiumPdma: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        premiumMa: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        premiumAv: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        premiumLiability: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
    },
    inputShare: {
        sharePdma: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
        shareMa: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
        shareAv: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
        shareLiability: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
    },
};

export default initialValues;