import { CalculatorPayload } from "./utils";

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