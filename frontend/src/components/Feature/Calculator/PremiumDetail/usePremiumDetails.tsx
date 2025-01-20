import { useState, useEffect } from "react";
import { initialAmounts, initialResults } from "./premiumDetailsData";

export const usePremiumDetails = (
    setFieldValue: (field: string, value: any) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
    const [amounts, setAmounts] = useState(initialAmounts);
    const [results, setResults] = useState(initialResults);

    const updateNestedField = (obj: any, path: string[], value: any) => {
        const [key, ...rest] = path;
        if (!rest.length) {
            obj[key] = value;
            return;
        }
        if (!obj[key]) obj[key] = {};
        updateNestedField(obj[key], rest, value);
    };

    const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const validValue = (value || "").replace(/[^0-9.]/g, "");

        const path = id.split(".");
        const updatedAmounts = JSON.parse(JSON.stringify(amounts));
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

        handleInputChange({
            target: {
                id,
                value: validValue,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };


    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        const numericValue = value.replace("%", "");
        let validValue = numericValue;

        if (/^\d*\.?\d+$/.test(numericValue)) {
            if (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 100) {
                validValue = numericValue + "%";
            } else {
                validValue = "100%";
            }
        }

        const path = id.split(".");
        const updatedAmounts = JSON.parse(JSON.stringify(amounts));
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

        handleInputChange({
            target: { id, value: validValue },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const recalculateResults = (updatedAmounts: any) => {
        const parsePercentage = (percentage: string) =>
            parseFloat(percentage.replace("%", "").trim() || "0") / 100;

        const calculateShare = (amount: string, share: string) => {
            const numericAmount = parseFloat(amount || "0");
            const numericShare = parsePercentage(share);
            return numericAmount * numericShare;
        };

        const newResults = {
            inputShare: {
                sharePdma: {
                    pdmaSharePremiumUsd: calculateShare(
                        updatedAmounts.inputPremium.premiumPdma.pdmaPremiumUsd,
                        updatedAmounts.inputPremium.premiumPdma.pdmaPremiumShare
                    ).toFixed(2),
                    pdmaSharePremiumIdr: calculateShare(
                        updatedAmounts.inputPremium.premiumPdma.pdmaPremiumIdr,
                        updatedAmounts.inputPremium.premiumPdma.pdmaPremiumShare
                    ).toFixed(2),
                },
                shareMa: {
                    maSharePremiumUsd: calculateShare(
                        updatedAmounts.inputPremium.premiumMa.maPremiumUsd,
                        updatedAmounts.inputPremium.premiumMa.maPremiumShare
                    ).toFixed(2),
                    maSharePremiumIdr: calculateShare(
                        updatedAmounts.inputPremium.premiumMa.maPremiumIdr,
                        updatedAmounts.inputPremium.premiumMa.maPremiumShare
                    ).toFixed(2),
                },
                shareAv: {
                    avSharePremiumUsd: calculateShare(
                        updatedAmounts.inputPremium.premiumAv.avPremiumUsd,
                        updatedAmounts.inputPremium.premiumAv.avPremiumShare
                    ).toFixed(2),
                    avSharePremiumIdr: calculateShare(
                        updatedAmounts.inputPremium.premiumAv.avPremiumIdr,
                        updatedAmounts.inputPremium.premiumAv.avPremiumShare
                    ).toFixed(2),
                },
                shareLiability: {
                    liabilitySharePremiumUsd: calculateShare(
                        updatedAmounts.inputPremium.premiumLiability.liabilityPremiumUsd,
                        updatedAmounts.inputPremium.premiumLiability.liabilityPremiumShare
                    ).toFixed(2),
                    liabilitySharePremiumIdr: calculateShare(
                        updatedAmounts.inputPremium.premiumLiability.liabilityPremiumIdr,
                        updatedAmounts.inputPremium.premiumLiability.liabilityPremiumShare
                    ).toFixed(2),
                },
            },
        };
        setResults(newResults);
        setFieldValue("Result Premium", newResults);
    };

    useEffect(() => {
        recalculateResults(amounts);
    }, [amounts]);

    return { amounts, results, setAmounts, handleLocalInputChange, handlePercentageChange };
};
