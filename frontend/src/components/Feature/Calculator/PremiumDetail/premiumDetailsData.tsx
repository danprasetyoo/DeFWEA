import { ChangeEvent } from "react";

export const inputPremium = {
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
};

export const inputShare = {
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
};

export const convertPremiumShares = (input: typeof inputPremium) => {
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
        premiumPdma: {
            ...input.premiumPdma,
            pdmaPremiumShare: convertToDecimal(input.premiumPdma.pdmaPremiumShare),
        },
        premiumMa: {
            ...input.premiumMa,
            maPremiumShare: convertToDecimal(input.premiumMa.maPremiumShare),
        },
        premiumAv: {
            ...input.premiumAv,
            avPremiumShare: convertToDecimal(input.premiumAv.avPremiumShare),
        },
        premiumLiability: {
            ...input.premiumLiability,
            liabilityPremiumShare: convertToDecimal(input.premiumLiability.liabilityPremiumShare),
        },
    };
};

export const rows = (
    amounts: typeof inputPremium,
    handlePercentageChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
    handleLocalInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => [
        {
            label: "MDP-USD",
            inputs: [
                {
                    id: "premiumPdma.pdmaPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumPdma.pdmaPremiumUsd,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "premiumMa.maPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumMa.maPremiumUsd,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "premiumAv.avPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumAv.avPremiumUsd,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "premiumLiability.liabilityPremiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumLiability.liabilityPremiumUsd,
                    onChange: handleLocalInputChange,
                },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                {
                    id: "premiumPdma.pdmaPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumPdma.pdmaPremiumIdr,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "premiumMa.maPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumMa.maPremiumIdr,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "premiumAv.avPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumAv.avPremiumIdr,
                    onChange: handleLocalInputChange,
                },
                {
                    id: "premiumLiability.liabilityPremiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumLiability.liabilityPremiumIdr,
                    onChange: handleLocalInputChange,
                },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                {
                    id: "premiumPdma.pdmaPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumPdma.pdmaPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "premiumPdma.pdmaPremiumShare"),
                },
                {
                    id: "premiumMa.maPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumMa.maPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "premiumMa.maPremiumShare"),
                },
                {
                    id: "premiumAv.avPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumAv.avPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "premiumAv.avPremiumShare"),
                },
                {
                    id: "premiumLiability.liabilityPremiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumLiability.liabilityPremiumShare,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handlePercentageChange(e, "premiumLiability.liabilityPremiumShare"),
                },
            ],
        },
    ];

export const readonlyRows = (results: typeof inputShare) => [
    {
        label: "Adjustment Premium - USD",
        inputs: [
            {
                id: "pdmaSharePremiumUsd",
                value: results.sharePdma.pdmaSharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
            {
                id: "maSharePremiumUsd",
                value: results.shareMa.maSharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
            {
                id: "avSharePremiumUsd",
                value: results.shareAv.avSharePremiumUsd,
                readonly: true,
                placeholder: "",
            },
            {
                id: "liabilitySharePremiumUsd",
                value: results.shareLiability.liabilitySharePremiumUsd,
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
                value: results.sharePdma.pdmaSharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
            {
                id: "maSharePremiumIdr",
                value: results.shareMa.maSharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
            {
                id: "avSharePremiumIdr",
                value: results.shareAv.avSharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
            {
                id: "liabilitySharePremiumIdr",
                value: results.shareLiability.liabilitySharePremiumIdr,
                readonly: true,
                placeholder: "",
            },
        ],
    },
];
