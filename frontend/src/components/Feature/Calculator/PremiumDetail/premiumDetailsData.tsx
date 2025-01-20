import { ChangeEvent } from "react";

export const initialAmounts = {
    inputPremium: {
        premiumPdma: {
            pdmaPremiumUsd: "",
            pdmaPremiumIdr: "",
            pdmaPremiumShare: "",
        },
        premiumMa: {
            maPremiumUsd: "",
            maPremiumIdr: "",
            maPremiumShare: "",
        },
        premiumAv: {
            avPremiumUsd: "",
            avPremiumIdr: "",
            avPremiumShare: "",
        },
        premiumLiability: {
            liabilityPremiumUsd: "",
            liabilityPremiumIdr: "",
            liabilityPremiumShare: "",
        },
    },
};

export const initialResults = {
    inputShare: {
        sharePdma: {
            pdmaSharePremiumUsd: "",
            pdmaSharePremiumIdr: "",
        },
        shareMa: {
            maSharePremiumUsd: "",
            maSharePremiumIdr: "",
        },
        shareAv: {
            avSharePremiumUsd: "",
            avSharePremiumIdr: "",
        },
        shareLiability: {
            liabilitySharePremiumUsd: "",
            liabilitySharePremiumIdr: "",
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
                {
                    id: "inputPremium.premiumPdma.pdmaPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumPdma.pdmaPremiumUsd,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "inputPremium.premiumMa.maPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumMa.maPremiumUsd,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "inputPremium.premiumAv.avPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumAv.avPremiumUsd,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "inputPremium.premiumLiability.liabilityPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumLiability.liabilityPremiumUsd,
                    onChange: handleLocalInputChange,
                },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                {
                    id: "inputPremium.premiumPdma.pdmaPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumPdma.pdmaPremiumIdr,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "inputPremium.premiumMa.maPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumMa.maPremiumIdr,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "inputPremium.premiumAv.avPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumAv.avPremiumIdr,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "inputPremium.premiumLiability.liabilityPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.inputPremium.premiumLiability.liabilityPremiumIdr,
                    onChange: handleLocalInputChange,
                },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                {
                    id: "inputPremium.premiumPdma.pdmaPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.inputPremium.premiumPdma.pdmaPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "inputPremium.premiumPdma.pdmaPremiumShare"),
                },
                {
                    id: "inputPremium.premiumMa.maPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.inputPremium.premiumMa.maPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "inputPremium.premiumMa.maPremiumShare"),
                },
                {
                    id: "inputPremium.premiumAv.avPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.inputPremium.premiumAv.avPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "inputPremium.premiumAv.avPremiumShare"),
                },
                {
                    id: "inputPremium.premiumLiability.liabilityPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.inputPremium.premiumLiability.liabilityPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "inputPremium.premiumLiability.liabilityPremiumShare"),
                },
            ],
        },
    ];

export const readonlyRows = (results: typeof initialResults) => [
    {
        label: "Adjustment Premium - USD",
        inputs: [
            {
                id: "pdmaSharePremiumUsd",
                value: results.inputShare.sharePdma.pdmaSharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
            {
                id: "maSharePremiumUsd",
                value: results.inputShare.shareMa.maSharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
            {
                id: "avSharePremiumUsd",
                value: results.inputShare.shareAv.avSharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
            {
                id: "liabilitySharePremiumUsd",
                value: results.inputShare.shareLiability.liabilitySharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
        ],
    },
    {
        label: "Adjustment Premium - IDR",
        inputs: [
            {
                id: "pdmaSharePremiumIdr",
                value: results.inputShare.sharePdma.pdmaSharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
            {
                id: "maSharePremiumIdr",
                value: results.inputShare.shareMa.maSharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
            {
                id: "avSharePremiumIdr",
                value: results.inputShare.shareAv.avSharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
            {
                id: "liabilitySharePremiumIdr",
                value: results.inputShare.shareLiability.liabilitySharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
        ],
    },
];
