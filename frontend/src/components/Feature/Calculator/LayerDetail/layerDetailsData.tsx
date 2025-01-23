export const inputLayerDetail = {
    layerPdma: {
        pdmaDetailUsd: "",
        pdmaDetailIdr: "",
        pdmaDetailShare: "",
    },
    layerMa: {
        maDetailUsd: "",
        maDetailIdr: "",
        maDetailShare: "",
    },
    layerAv: {
        avDetailUsd: "",
        avDetailIdr: "",
        avDetailShare: "",
    },
    layerLiability: {
        liabilityDetailUsd: "",
        liabilityDetailIdr: "",
        liabilityDetailShare: "",
    },
};

export const inputShare = {
    sharePdma: {
        pdmaShareUsd: "",
        pdmaShareIdr: "",
    },
    shareMa: {
        maShareUsd: "",
        maShareIdr: "",
    },
    shareAv: {
        avShareUsd: "",
        avShareIdr: "",
    },
    shareLiability: {
        liabilityShareUsd: "",
        liabilityShareIdr: "",
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
                { id: "layerPdma.pdmaDetailUsd", placeholder: "Amount", value: amounts.layerPdma.pdmaDetailUsd, onChange: handleLocalInputChange },
                { id: "layerMa.maDetailUsd", placeholder: "Amount", value: amounts.layerMa.maDetailUsd, onChange: handleLocalInputChange },
                { id: "layerAv.avDetailUsd", placeholder: "Amount", value: amounts.layerAv.avDetailUsd, onChange: handleLocalInputChange },
                { id: "layerLiability.liabilityDetailUsd", placeholder: "Amount", value: amounts.layerLiability.liabilityDetailUsd, onChange: handleLocalInputChange },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "layerPdma.pdmaDetailIdr", placeholder: "Amount", value: amounts.layerPdma.pdmaDetailIdr, onChange: handleLocalInputChange },
                { id: "layerMa.maDetailIdr", placeholder: "Amount", value: amounts.layerMa.maDetailIdr, onChange: handleLocalInputChange },
                { id: "layerAv.avDetailIdr", placeholder: "Amount", value: amounts.layerAv.avDetailIdr, onChange: handleLocalInputChange },
                { id: "layerLiability.liabilityDetailIdr", placeholder: "Amount", value: amounts.layerLiability.liabilityDetailIdr, onChange: handleLocalInputChange },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "layerPdma.pdmaDetailShare", placeholder: "Percentage", value: amounts.layerPdma.pdmaDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerPdma.pdmaDetailShare") },
                { id: "layerMa.maDetailShare", placeholder: "Percentage", value: amounts.layerMa.maDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerMa.maDetailShare") },
                { id: "layerAv.avDetailShare", placeholder: "Percentage", value: amounts.layerAv.avDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerAv.avDetailShare") },
                { id: "layerLiability.liabilityDetailShare", placeholder: "Percentage", value: amounts.layerLiability.liabilityDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "layerLiability.liabilityDetailShare") },
            ],
        },
    ];

export const readonlyRows = (results: typeof inputShare) => [
    {
        label: "MDP - USD",
        inputs: [
            {
                id: "sharePdma.pdmaShareUsd",
                value: results.sharePdma.pdmaShareUsd,
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.maShareUsd",
                value: results.shareMa.maShareUsd,
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.avShareUsd",
                value: results.shareAv.avShareUsd,
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.liabilityShareUsd",
                value: results.shareLiability.liabilityShareUsd,
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
                value: results.sharePdma.pdmaShareIdr,
                readonly: true,
                placeholder: ""
            },
            { id: "shareMa.maShareIdr", value: results.shareMa.maShareIdr, readonly: true, placeholder: "" },
            { id: "shareAv.avShareIdr", value: results.shareAv.avShareIdr, readonly: true, placeholder: "" },
            { id: "shareLiability.liabilityShareIdr", value: results.shareLiability.liabilityShareIdr, readonly: true, placeholder: "" },
        ],
    },
];
