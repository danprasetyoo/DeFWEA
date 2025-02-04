import { useState, useEffect, useCallback } from "react";
import { inputLayerDetail, inputShare } from "./layerDetailsData";

export const useLayerDetails = (
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setFieldValue: (field: string, value: any) => void
) => {
    const [amounts, setAmounts] = useState(inputLayerDetail);
    const [results, setResults] = useState(inputShare);

    const updateNestedField = useCallback((obj: any, path: string[], value: any) => {
        const [key, ...rest] = path;
        if (!rest.length) {
            obj[key] = value;
            return;
        }
        if (!obj[key]) obj[key] = {};
        updateNestedField(obj[key], rest, value);
    }, []);

    const handleLocalInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    }, [amounts, handleInputChange, updateNestedField]);

    const handlePercentageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        const numericValue = parseFloat((value || "").replace("%", "")) || 0;
        const validValue = Math.max(0, Math.min(100, numericValue));

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
    }, [amounts, handleInputChange, updateNestedField]);

    const recalculateResults = useCallback((updatedAmounts: any) => {
        const parsePercentage = (percentage: number | string) => {
            const num = parseFloat((percentage?.toString() || "").replace("%", "").trim() || "0");
            return isNaN(num) ? 0 : num / 100;
        };

        const calculateShare = (amount: number | string, share: number | string) => {
            const numAmount = parseFloat(amount?.toString() || "0");
            const numShare = parsePercentage(share);
            return isNaN(numAmount) || isNaN(numShare) ? 0 : numAmount * numShare;
        };

        const newResults = {
            sharePdma: {
                shareUsd: calculateShare(
                    updatedAmounts.layerPdma.detailUsd,  // Optional chaining
                    updatedAmounts.layerPdma.detailShare // Optional chaining
                ),
                shareIdr: calculateShare(
                    updatedAmounts.layerPdma.detailIdr, // Optional chaining
                    updatedAmounts.layerPdma.detailShare // Optional chaining
                ),
            },
            shareMa: {
                shareUsd: calculateShare(
                    updatedAmounts.layerMa.detailUsd,   // Optional chaining
                    updatedAmounts.layerMa.detailShare  // Optional chaining
                ),
                shareIdr: calculateShare(
                    updatedAmounts.layerMa.detailIdr,  // Optional chaining
                    updatedAmounts.layerMa.detailShare  // Optional chaining
                ),
            },
            shareAv: {
                shareUsd: calculateShare(
                    updatedAmounts.layerAv.detailUsd,   // Optional chaining
                    updatedAmounts.layerAv.detailShare  // Optional chaining
                ),
                shareIdr: calculateShare(
                    updatedAmounts.layerAv.detailIdr,  // Optional chaining
                    updatedAmounts.layerAv.detailShare  // Optional chaining
                ),
            },
            shareLiability: {
                shareUsd: calculateShare(
                    updatedAmounts.layerLiability.detailUsd, // Optional chaining
                    updatedAmounts.layerLiability.detailShare // Optional chaining
                ),
                shareIdr: calculateShare(
                    updatedAmounts.layerLiability.detailIdr, // Optional chaining
                    updatedAmounts.layerLiability.detailShare // Optional chaining
                ),
            },
        };

        setResults(newResults);
        setFieldValue("inputShare", newResults);
    }, []);

    useEffect(() => {
        recalculateResults(amounts);
    }, [amounts, recalculateResults]);

    return {
        amounts,
        results,
        handleLocalInputChange,
        handlePercentageChange,
    };
};