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
        const validValue = parseFloat((value || "").replace(/[^0-9.]/g, "")) || 0;

        const path = id.split(".");
        const updatedAmounts = JSON.parse(JSON.stringify(amounts));
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

        handleInputChange({
            ...e,
            target: {
                ...e.target,
                id,
                value: validValue.toString(),
            },
        });
    };

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        const numericValue = parseFloat((value || "").replace("%", "")) || 0;
        let validValue = numericValue;

        if (numericValue >= 0 && numericValue <= 100) {
            validValue = numericValue;
        } else {
            validValue = 100;
        }

        const path = id.split(".");
        const updatedAmounts = JSON.parse(JSON.stringify(amounts));
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

        handleInputChange({
            ...e,
            target: {
                ...e.target,
                id,
                value: validValue.toString(),
            },
        });
    };

    const recalculateResults = (updatedAmounts: any) => {
        const parsePercentage = (percentage: number) =>
            parseFloat((percentage.toString() || "").replace("%", "").trim() || "0") / 100;

        const calculateShare = (amount: number, share: number) => {
            const numericAmount = parseFloat(amount.toString() || "0");
            const numericShare = parsePercentage(share);
            return numericAmount * numericShare;
        };

        const newResults = {
            sharePdma: {
                pdmaShareUsd: calculateShare(
                    updatedAmounts.layerPdma.pdmaDetailUsd,
                    updatedAmounts.layerPdma.pdmaDetailShare
                ),
                pdmaShareIdr: calculateShare(
                    updatedAmounts.layerPdma.pdmaDetailIdr,
                    updatedAmounts.layerPdma.pdmaDetailShare
                ),
            },
            shareMa: {
                maShareUsd: calculateShare(
                    updatedAmounts.layerMa.maDetailUsd,
                    updatedAmounts.layerMa.maDetailShare
                ),
                maShareIdr: calculateShare(
                    updatedAmounts.layerMa.maDetailIdr,
                    updatedAmounts.layerMa.maDetailShare
                ),
            },
            shareAv: {
                avShareUsd: calculateShare(
                    updatedAmounts.layerAv.avDetailUsd,
                    updatedAmounts.layerAv.avDetailShare
                ),
                avShareIdr: calculateShare(
                    updatedAmounts.layerAv.avDetailIdr,
                    updatedAmounts.layerAv.avDetailShare
                ),
            },
            shareLiability: {
                liabilityShareUsd: calculateShare(
                    updatedAmounts.layerLiability.liabilityDetailUsd,
                    updatedAmounts.layerLiability.liabilityDetailShare
                ),
                liabilityShareIdr: calculateShare(
                    updatedAmounts.layerLiability.liabilityDetailIdr,
                    updatedAmounts.layerLiability.liabilityDetailShare
                ),
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
