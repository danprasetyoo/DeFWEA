import { useState, useEffect } from "react";
import { inputLayerDetail, inputShare } from "./layerDetailsData";

export const useLayerDetails = (
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setFieldValue: (field: string, value: any) => void
) => {
    const [amounts, setAmounts] = useState(inputLayerDetail);
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
        const numericValue = (value || "").replace("%", "");
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
            target: {
                id,
                value: validValue,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const recalculateResults = (updatedAmounts: any) => {
        const parsePercentage = (percentage: string) =>
            parseFloat((percentage || "").replace("%", "").trim() || "0") / 100;

        const calculateShare = (amount: string, share: string) => {
            const numericAmount = parseFloat(amount || "0");
            const numericShare = parsePercentage(share);
            return numericAmount * numericShare;
        };

        const newResults = {
            sharePdma: {
                pdmaShareUsd: calculateShare(
                    updatedAmounts.layerPdma.pdmaDetailUsd,
                    updatedAmounts.layerPdma.pdmaDetailShare
                ).toFixed(2),
                pdmaShareIdr: calculateShare(
                    updatedAmounts.layerPdma.pdmaDetailIdr,
                    updatedAmounts.layerPdma.pdmaDetailShare
                ).toFixed(2),
            },
            shareMa: {
                maShareUsd: calculateShare(
                    updatedAmounts.layerMa.maDetailUsd,
                    updatedAmounts.layerMa.maDetailShare
                ).toFixed(2),
                maShareIdr: calculateShare(
                    updatedAmounts.layerMa.maDetailIdr,
                    updatedAmounts.layerMa.maDetailShare
                ).toFixed(2),
            },
            shareAv: {
                avShareUsd: calculateShare(
                    updatedAmounts.layerAv.avDetailUsd,
                    updatedAmounts.layerAv.avDetailShare
                ).toFixed(2),
                avShareIdr: calculateShare(
                    updatedAmounts.layerAv.avDetailIdr,
                    updatedAmounts.layerAv.avDetailShare
                ).toFixed(2),
            },
            shareLiability: {
                liabilityShareUsd: calculateShare(
                    updatedAmounts.layerLiability.liabilityDetailUsd,
                    updatedAmounts.layerLiability.liabilityDetailShare
                ).toFixed(2),
                liabilityShareIdr: calculateShare(
                    updatedAmounts.layerLiability.liabilityDetailIdr,
                    updatedAmounts.layerLiability.liabilityDetailShare
                ).toFixed(2),
            },
        };

        setResults(newResults);
        setFieldValue("inputShare", newResults);
    };

    useEffect(() => {
        recalculateResults(amounts);
    }, [amounts]);

    return {
        amounts,
        results,
        handleLocalInputChange,
        handlePercentageChange,
    };
};
