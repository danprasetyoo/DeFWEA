export const inputLayerDetail = {
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
};

export const inputShare = {
    sharePdma: {
        shareUsd: 0,
        shareIdr: 0,
    },
    shareMa: {
        shareUsd: 0,
        shareIdr: 0,
    },
    shareAv: {
        shareUsd: 0,
        shareIdr: 0,
    },
    shareLiability: {
        shareUsd: 0,
        shareIdr: 0,
    },
};

export const convertLayerShares = (input: typeof inputLayerDetail) => {
    const convertToDecimal = (value: string | number): number => {
        if (typeof value === "string") {
            if (value.includes("%")) {
                return parseFloat(value.replace("%", "")) / 100;
            }
            return parseFloat(value) / 100;
        } else if (typeof value === "number") {
            return value / 100;
        }
        return 0;
    };

    return {
        layerPdma: {
            ...input.layerPdma,
            pdmaDetailShare: convertToDecimal(input.layerPdma.detailShare),
        },
        layerMa: {
            ...input.layerMa,
            maDetailShare: convertToDecimal(input.layerMa.detailShare),
        },
        layerAv: {
            ...input.layerAv,
            avDetailShare: convertToDecimal(input.layerAv.detailShare),
        },
        layerLiability: {
            ...input.layerLiability,
            detailShare: convertToDecimal(input.layerLiability.detailShare),
        },
    };
};

export const rows = (
    amounts: typeof inputLayerDetail,
    handlePercentageChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
    handleLocalInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => [
        {
            label: "MDP-USD",
            inputs: [
                { id: "layerPdma.detailUsd", placeholder: "Amount", value: amounts.layerPdma.detailUsd.toString(), onChange: handleLocalInputChange },
                { id: "layerMa.detailUsd", placeholder: "Amount", value: amounts.layerMa.detailUsd.toString(), onChange: handleLocalInputChange },
                { id: "layerAv.detailUsd", placeholder: "Amount", value: amounts.layerAv.detailUsd.toString(), onChange: handleLocalInputChange },
                { id: "layerLiability.detailUsd", placeholder: "Amount", value: amounts.layerLiability.detailUsd.toString(), onChange: handleLocalInputChange },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "layerPdma.detailIdr", placeholder: "Amount", value: amounts.layerPdma.detailIdr.toString(), onChange: handleLocalInputChange },
                { id: "layerMa.detailIdr", placeholder: "Amount", value: amounts.layerMa.detailIdr.toString(), onChange: handleLocalInputChange },
                { id: "layerAv.detailIdr", placeholder: "Amount", value: amounts.layerAv.detailIdr.toString(), onChange: handleLocalInputChange },
                { id: "layerLiability.detailIdr", placeholder: "Amount", value: amounts.layerLiability.detailIdr.toString(), onChange: handleLocalInputChange },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "layerPdma.detailShare", placeholder: "Percentage", value: amounts.layerPdma.detailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerPdma.detailShare") },
                { id: "layerMa.detailShare", placeholder: "Percentage", value: amounts.layerMa.detailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerMa.detailShare") },
                { id: "layerAv.detailShare", placeholder: "Percentage", value: amounts.layerAv.detailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerAv.detailShare") },
                { id: "layerLiability.detailShare", placeholder: "Percentage", value: amounts.layerLiability.detailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerLiability.detailShare") },
            ],
        },
    ];

export const readonlyRows = (results: typeof inputShare) => [
    {
        label: "MDP - USD",
        inputs: [
            {
                id: "sharePdma.shareUsd",
                value: results.sharePdma.shareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.shareUsd",
                value: results.shareMa.shareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.shareUsd",
                value: results.shareAv.shareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.shareUsd",
                value: results.shareLiability.shareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
    {
        label: "MDP - IDR",
        inputs: [
            {
                id: "sharePdma.shareIdr",
                value: results.sharePdma.shareIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.shareIdr",
                value: results.shareMa.shareIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.shareIdr",
                value: results.shareAv.shareIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.shareIdr",
                value: results.shareLiability.shareIdr.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
];
