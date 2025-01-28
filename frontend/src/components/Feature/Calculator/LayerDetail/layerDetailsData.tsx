export const inputLayerDetail = {
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
};

export const inputShare = {
    sharePdma: {
        pdmaShareUsd: 0,
        pdmaShareIdr: 0,
    },
    shareMa: {
        maShareUsd: 0,
        maShareIdr: 0,
    },
    shareAv: {
        avShareUsd: 0,
        avShareIdr: 0,
    },
    shareLiability: {
        liabilityShareUsd: 0,
        liabilityShareIdr: 0,
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
            pdmaDetailShare: convertToDecimal(input.layerPdma.pdmaDetailShare),
        },
        layerMa: {
            ...input.layerMa,
            maDetailShare: convertToDecimal(input.layerMa.maDetailShare),
        },
        layerAv: {
            ...input.layerAv,
            avDetailShare: convertToDecimal(input.layerAv.avDetailShare),
        },
        layerLiability: {
            ...input.layerLiability,
            liabilityDetailShare: convertToDecimal(input.layerLiability.liabilityDetailShare),
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
                { id: "layerPdma.pdmaDetailUsd", placeholder: "Amount", value: amounts.layerPdma.pdmaDetailUsd.toString(), onChange: handleLocalInputChange },
                { id: "layerMa.maDetailUsd", placeholder: "Amount", value: amounts.layerMa.maDetailUsd.toString(), onChange: handleLocalInputChange },
                { id: "layerAv.avDetailUsd", placeholder: "Amount", value: amounts.layerAv.avDetailUsd.toString(), onChange: handleLocalInputChange },
                { id: "layerLiability.liabilityDetailUsd", placeholder: "Amount", value: amounts.layerLiability.liabilityDetailUsd.toString(), onChange: handleLocalInputChange },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "layerPdma.pdmaDetailIdr", placeholder: "Amount", value: amounts.layerPdma.pdmaDetailIdr.toString(), onChange: handleLocalInputChange },
                { id: "layerMa.maDetailIdr", placeholder: "Amount", value: amounts.layerMa.maDetailIdr.toString(), onChange: handleLocalInputChange },
                { id: "layerAv.avDetailIdr", placeholder: "Amount", value: amounts.layerAv.avDetailIdr.toString(), onChange: handleLocalInputChange },
                { id: "layerLiability.liabilityDetailIdr", placeholder: "Amount", value: amounts.layerLiability.liabilityDetailIdr.toString(), onChange: handleLocalInputChange },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "layerPdma.pdmaDetailShare", placeholder: "Percentage", value: amounts.layerPdma.pdmaDetailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerPdma.pdmaDetailShare") },
                { id: "layerMa.maDetailShare", placeholder: "Percentage", value: amounts.layerMa.maDetailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerMa.maDetailShare") },
                { id: "layerAv.avDetailShare", placeholder: "Percentage", value: amounts.layerAv.avDetailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerAv.avDetailShare") },
                { id: "layerLiability.liabilityDetailShare", placeholder: "Percentage", value: amounts.layerLiability.liabilityDetailShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerLiability.liabilityDetailShare") },
            ],
        },
    ];

export const readonlyRows = (results: typeof inputShare) => [
    {
        label: "MDP - USD",
        inputs: [
            {
                id: "sharePdma.pdmaShareUsd",
                value: results.sharePdma.pdmaShareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.maShareUsd",
                value: results.shareMa.maShareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.avShareUsd",
                value: results.shareAv.avShareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.liabilityShareUsd",
                value: results.shareLiability.liabilityShareUsd.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
    {
        label: "MDP - IDR",
        inputs: [
            {
                id: "sharePdma.pdmaShareIdr",
                value: results.sharePdma.pdmaShareIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            { id: "shareMa.maShareIdr", value: results.shareMa.maShareIdr.toString(), readonly: true, placeholder: "" },
            { id: "shareAv.avShareIdr", value: results.shareAv.avShareIdr.toString(), readonly: true, placeholder: "" },
            { id: "shareLiability.liabilityShareIdr", value: results.shareLiability.liabilityShareIdr.toString(), readonly: true, placeholder: "" },
        ],
    },
];
