export const inputPremium = {
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
};

export const inputShare = {
    sharePdma: {
        pdmaSharePremiumUsd: 0,
        pdmaSharePremiumIdr: 0,
    },
    shareMa: {
        maSharePremiumUsd: 0,
        maSharePremiumIdr: 0,
    },
    shareAv: {
        avSharePremiumUsd: 0,
        avSharePremiumIdr: 0,
    },
    shareLiability: {
        liabilitySharePremiumUsd: 0,
        liabilitySharePremiumIdr: 0,
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
                { id: "premiumPdma.pdmaPremiumUsd", placeholder: "Amount", value: amounts.premiumPdma.pdmaPremiumUsd.toString(), onChange: handleLocalInputChange },
                { id: "premiumMa.maPremiumUsd", placeholder: "Amount", value: amounts.premiumMa.maPremiumUsd.toString(), onChange: handleLocalInputChange },
                { id: "premiumAv.avPremiumUsd", placeholder: "Amount", value: amounts.premiumAv.avPremiumUsd.toString(), onChange: handleLocalInputChange },
                { id: "premiumLiability.liabilityPremiumUsd", placeholder: "Amount", value: amounts.premiumLiability.liabilityPremiumUsd.toString(), onChange: handleLocalInputChange },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "premiumPdma.pdmaPremiumIdr", placeholder: "Amount", value: amounts.premiumPdma.pdmaPremiumIdr.toString(), onChange: handleLocalInputChange },
                { id: "premiumMa.maPremiumIdr", placeholder: "Amount", value: amounts.premiumMa.maPremiumIdr.toString(), onChange: handleLocalInputChange },
                { id: "premiumAv.avPremiumIdr", placeholder: "Amount", value: amounts.premiumAv.avPremiumIdr.toString(), onChange: handleLocalInputChange },
                { id: "premiumLiability.liabilityPremiumIdr", placeholder: "Amount", value: amounts.premiumLiability.liabilityPremiumIdr.toString(), onChange: handleLocalInputChange },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "premiumPdma.pdmaPremiumShare", placeholder: "Percentage", value: amounts.premiumPdma.pdmaPremiumShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumPdma.pdmaPremiumShare") },
                { id: "premiumMa.maPremiumShare", placeholder: "Percentage", value: amounts.premiumMa.maPremiumShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumMa.maPremiumShare") },
                { id: "premiumAv.avPremiumShare", placeholder: "Percentage", value: amounts.premiumAv.avPremiumShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumAv.avPremiumShare") },
                { id: "premiumLiability.liabilityPremiumShare", placeholder: "Percentage", value: amounts.premiumLiability.liabilityPremiumShare.toString(), onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "premiumLiability.liabilityPremiumShare") },
            ],
        },
    ];

export const readonlyRows = (results: typeof inputShare) => [
    {
        label: "MDP - USD",
        inputs: [
            {
                id: "sharePdma.pdmaSharePremiumUsd",
                value: results.sharePdma.pdmaSharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.maSharePremiumUsd",
                value: results.shareMa.maSharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.avSharePremiumUsd",
                value: results.shareAv.avSharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.liabilitySharePremiumUsd",
                value: results.shareLiability.liabilitySharePremiumUsd.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
    {
        label: "MDP - IDR",
        inputs: [
            {
                id: "sharePdma.pdmaSharePremiumIdr",
                value: results.sharePdma.pdmaSharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareMa.maSharePremiumIdr",
                value: results.shareMa.maSharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareAv.avSharePremiumIdr",
                value: results.shareAv.avSharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
            {
                id: "shareLiability.liabilitySharePremiumIdr",
                value: results.shareLiability.liabilitySharePremiumIdr.toString(),
                readonly: true,
                placeholder: ""
            },
        ],
    },
];
