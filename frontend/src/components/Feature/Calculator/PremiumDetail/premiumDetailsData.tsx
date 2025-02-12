export const inputPremium = {
    premiumPdma: {
        premiumUsd: 0,
        premiumIdr: 0,
        premiumShare: 0,
    },
    premiumMa: {
        premiumUsd: 0,
        premiumIdr: 0,
        premiumShare: 0,
    },
    premiumAv: {
        premiumUsd: 0,
        premiumIdr: 0,
        premiumShare: 0,
    },
    premiumLiability: {
        premiumUsd: 0,
        premiumIdr: 0,
        premiumShare: 0,
    },
};

export const inputShare = {
    sharePdma: {
        sharePremiumUsd: 0,
        sharePremiumIdr: 0,
    },
    shareMa: {
        sharePremiumUsd: 0,
        sharePremiumIdr: 0,
    },
    shareAv: {
        sharePremiumUsd: 0,
        sharePremiumIdr: 0,
    },
    shareLiability: {
        sharePremiumUsd: 0,
        sharePremiumIdr: 0,
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
            premiumShare: convertToDecimal(input.premiumPdma.premiumShare),
        },
        premiumMa: {
            ...input.premiumMa,
            premiumShare: convertToDecimal(input.premiumMa.premiumShare),
        },
        premiumAv: {
            ...input.premiumAv,
            premiumShare: convertToDecimal(input.premiumAv.premiumShare),
        },
        premiumLiability: {
            ...input.premiumLiability,
            premiumShare: convertToDecimal(input.premiumLiability.premiumShare),
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
                    id: "premiumPdma.premiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumPdma.premiumUsd.toString(),
                    onChange: handleLocalInputChange
                },
                {
                    id: "premiumMa.premiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumMa.premiumUsd.toString(),
                    onChange: handleLocalInputChange
                },

                {
                    id: "premiumAv.premiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumAv.premiumUsd.toString(),
                    onChange: handleLocalInputChange
                },
                {
                    id: "premiumLiability.premiumUsd",
                    placeholder: "Amount",
                    value: amounts.premiumLiability.premiumUsd.toString(),
                    onChange: handleLocalInputChange
                },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                {
                    id: "premiumPdma.premiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumPdma.premiumIdr.toString(),
                    onChange: handleLocalInputChange

                },
                {
                    id: "premiumMa.premiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumMa.premiumIdr.toString(),
                    onChange: handleLocalInputChange

                },
                {
                    id: "premiumAv.premiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumAv.premiumIdr.toString(),
                    onChange: handleLocalInputChange

                },
                {
                    id: "premiumLiability.premiumIdr",
                    placeholder: "Amount",
                    value: amounts.premiumLiability.premiumIdr.toString(),
                    onChange: handleLocalInputChange

                },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                {
                    id: "premiumPdma.premiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumPdma.premiumShare.toString(),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumPdma.premiumShare")

                },
                {
                    id: "premiumMa.premiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumMa.premiumShare.toString(),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumMa.premiumShare")

                },
                {
                    id: "premiumAv.premiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumAv.premiumShare.toString(),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumAv.premiumShare")

                },
                {
                    id: "premiumLiability.premiumShare",
                    placeholder: "Percentage",
                    value: amounts.premiumLiability.premiumShare.toString(),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumLiability.premiumShare")

                },
            ],
        },
    ];

export const readonlyRows = (results: typeof inputShare) => [
    {
        label: "MDP - USD",
        inputs: [
            {
                id: "sharePdma.sharePremiumUsd",
                value: results.sharePdma.sharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.sharePremiumUsd",
                value: results.shareMa.sharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.sharePremiumUsd",
                value: results.shareAv.sharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.sharePremiumUsd",
                value: results.shareLiability.sharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
    {
        label: "MDP - IDR",
        inputs: [
            {
                id: "sharePdma.sharePremiumIdr",
                value: results.sharePdma.sharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.sharePremiumIdr",
                value: results.shareMa.sharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.sharePremiumIdr",
                value: results.shareAv.sharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.sharePremiumIdr",
                value: results.shareLiability.sharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
];
