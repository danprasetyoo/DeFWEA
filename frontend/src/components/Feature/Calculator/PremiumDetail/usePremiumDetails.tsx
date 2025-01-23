import { useState, useEffect } from "react";
import { inputPremium, inputShare } from "./premiumDetailsData";

export const usePremiumDetails = (
    setFieldValue: (field: string, value: any) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
    const [amounts, setAmounts] = useState(inputPremium);
    const [results, setResults] = useState(inputShare);

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
            sharePdma: {
                pdmaSharePremiumUsd: calculateShare(
                    updatedAmounts.premiumPdma.pdmaPremiumUsd,
                    updatedAmounts.premiumPdma.pdmaPremiumShare
                ).toFixed(2),
                pdmaSharePremiumIdr: calculateShare(
                    updatedAmounts.premiumPdma.pdmaPremiumIdr,
                    updatedAmounts.premiumPdma.pdmaPremiumShare
                ).toFixed(2),
            },
            shareMa: {
                maSharePremiumUsd: calculateShare(
                    updatedAmounts.premiumMa.maPremiumUsd,
                    updatedAmounts.premiumMa.maPremiumShare
                ).toFixed(2),
                maSharePremiumIdr: calculateShare(
                    updatedAmounts.premiumMa.maPremiumIdr,
                    updatedAmounts.premiumMa.maPremiumShare
                ).toFixed(2),
            },
            shareAv: {
                avSharePremiumUsd: calculateShare(
                    updatedAmounts.premiumAv.avPremiumUsd,
                    updatedAmounts.premiumAv.avPremiumShare
                ).toFixed(2),
                avSharePremiumIdr: calculateShare(
                    updatedAmounts.premiumAv.avPremiumIdr,
                    updatedAmounts.premiumAv.avPremiumShare
                ).toFixed(2),
            },
            shareLiability: {
                liabilitySharePremiumUsd: calculateShare(
                    updatedAmounts.premiumLiability.liabilityPremiumUsd,
                    updatedAmounts.premiumLiability.liabilityPremiumShare
                ).toFixed(2),
                liabilitySharePremiumIdr: calculateShare(
                    updatedAmounts.premiumLiability.liabilityPremiumIdr,
                    updatedAmounts.premiumLiability.liabilityPremiumShare
                ).toFixed(2),
            },
        };

        setResults(newResults);
        setFieldValue("inputShare", newResults);
    };

    useEffect(() => {
        recalculateResults(amounts);
    }, [amounts]);

    return { amounts, results, setAmounts, handleLocalInputChange, handlePercentageChange };
};
