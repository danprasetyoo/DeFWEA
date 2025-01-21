export const initialAmounts = {
    inputLayerDetail: {
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
    },
};

export const initialResults = {
    inputShare: {
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
    },
};

export const rows = (
    amounts: typeof initialAmounts,
    handlePercentageChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
    handleLocalInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => [
        {
            label: "MDP-USD",
            inputs: [
                { id: "inputLayerDetail.layerPdma.pdmaDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerPdma.pdmaDetailUsd, onChange: handleLocalInputChange },
                { id: "inputLayerDetail.layerMa.maDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerMa.maDetailUsd, onChange: handleLocalInputChange },
                { id: "inputLayerDetail.layerAv.avDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerAv.avDetailUsd, onChange: handleLocalInputChange },
                { id: "inputLayerDetail.layerLiability.liabilityDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerLiability.liabilityDetailUsd, onChange: handleLocalInputChange },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "inputLayerDetail.layerPdma.pdmaDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerPdma.pdmaDetailIdr, onChange: handleLocalInputChange },
                { id: "inputLayerDetail.layerMa.maDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerMa.maDetailIdr, onChange: handleLocalInputChange },
                { id: "inputLayerDetail.layerAv.avDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerAv.avDetailIdr, onChange: handleLocalInputChange },
                { id: "inputLayerDetail.layerLiability.liabilityDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerLiability.liabilityDetailIdr, onChange: handleLocalInputChange },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "inputLayerDetail.layerPdma.pdmaDetailShare", placeholder: "Percentage", value: amounts.inputLayerDetail.layerPdma.pdmaDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputLayerDetail.layerPdma.pdmaDetailShare") },
                { id: "inputLayerDetail.layerMa.maDetailShare", placeholder: "Percentage", value: amounts.inputLayerDetail.layerMa.maDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputLayerDetail.layerMa.maDetailShare") },
                { id: "inputLayerDetail.layerAv.avDetailShare", placeholder: "Percentage", value: amounts.inputLayerDetail.layerAv.avDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputLayerDetail.layerAv.avDetailShare") },
                { id: "inputLayerDetail.layerLiability.liabilityDetailShare", placeholder: "Percentage", value: amounts.inputLayerDetail.layerLiability.liabilityDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputLayerDetail.layerLiability.liabilityDetailShare") },
            ],
        },
    ];

export const readonlyRows = (results: typeof initialResults) => [
    {
        label: "MDP - USD",
        inputs: [
            {
                id: "inputShare.sharePdma.pdmaShareUsd",
                value: results.inputShare.sharePdma.pdmaShareUsd,
                readonly: true,
                placeholder: ""
            },
            {
                id: "inputShare.shareMa.maShareUsd",
                value: results.inputShare.shareMa.maShareUsd,
                readonly: true,
                placeholder: ""
            },
            {
                id: "inputShare.shareAv.avShareUsd",
                value: results.inputShare.shareAv.avShareUsd,
                readonly: true,
                placeholder: ""
            },
            {
                id: "inputShare.shareLiability.liabilityShareUsd",
                value: results.inputShare.shareLiability.liabilityShareUsd,
                readonly: true,
                placeholder: ""
            },
        ],
    },
    {
        label: "MDP - IDR",
        inputs: [
            {
                id: "inputShare.sharePdma.pdmaShareIdr",
                value: results.inputShare.sharePdma.pdmaShareIdr,
                readonly: true,
                placeholder: ""
            },
            { id: "inputShare.shareMa.maShareIdr", value: results.inputShare.shareMa.maShareIdr, readonly: true, placeholder: "" },
            { id: "inputShare.shareAv.avShareIdr", value: results.inputShare.shareAv.avShareIdr, readonly: true, placeholder: "" },
            { id: "inputShare.shareLiability.liabilityShareIdr", value: results.inputShare.shareLiability.liabilityShareIdr, readonly: true, placeholder: "" },
        ],
    },
];
