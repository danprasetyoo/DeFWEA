import React, { useState, useEffect } from "react";
import InputGroup from "./InputGroup";

type LayerDetailProps = {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFieldValue: (field: string, value: any) => void;
};

const LayerDetail: React.FC<LayerDetailProps> = ({ handleInputChange, setFieldValue }) => {
    const [amounts, setAmounts] = useState({
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
    });

    const [results, setResults] = useState({
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
    });

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

        // Split the id into path (if nested, e.g., "layerPdma.pdmaDetailUsd")
        const path = id.split(".");
        const updatedAmounts = JSON.parse(JSON.stringify(amounts)); // Deep copy to trigger re-render
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
            inputShare: {
                sharePdma: {
                    pdmaShareUsd: calculateShare(
                        updatedAmounts.inputLayerDetail.layerPdma.pdmaDetailUsd,
                        updatedAmounts.inputLayerDetail.layerPdma.pdmaDetailShare
                    ).toFixed(2),
                    pdmaShareIdr: calculateShare(
                        updatedAmounts.inputLayerDetail.layerPdma.pdmaDetailIdr,
                        updatedAmounts.inputLayerDetail.layerPdma.pdmaDetailShare
                    ).toFixed(2),
                },
                shareMa: {
                    maShareUsd: calculateShare(
                        updatedAmounts.inputLayerDetail.layerMa.maDetailUsd,
                        updatedAmounts.inputLayerDetail.layerMa.maDetailShare
                    ).toFixed(2),
                    maShareIdr: calculateShare(
                        updatedAmounts.inputLayerDetail.layerMa.maDetailIdr,
                        updatedAmounts.inputLayerDetail.layerMa.maDetailShare
                    ).toFixed(2),
                },
                shareAv: {
                    avShareUsd: calculateShare(
                        updatedAmounts.inputLayerDetail.layerAv.avDetailUsd,
                        updatedAmounts.inputLayerDetail.layerAv.avDetailShare
                    ).toFixed(2),
                    avShareIdr: calculateShare(
                        updatedAmounts.inputLayerDetail.layerAv.avDetailIdr,
                        updatedAmounts.inputLayerDetail.layerAv.avDetailShare
                    ).toFixed(2),
                },
                shareLiability: {
                    liabilityShareUsd: calculateShare(
                        updatedAmounts.inputLayerDetail.layerLiability.liabilityDetailUsd,
                        updatedAmounts.inputLayerDetail.layerLiability.liabilityDetailShare
                    ).toFixed(2),
                    liabilityShareIdr: calculateShare(
                        updatedAmounts.inputLayerDetail.layerLiability.liabilityDetailIdr,
                        updatedAmounts.inputLayerDetail.layerLiability.liabilityDetailShare
                    ).toFixed(2),
                },
            },
        };

        setResults(newResults);
        setFieldValue("results", newResults);
    };

    useEffect(() => {
        recalculateResults(amounts);
    }, [amounts]);
    type InputType = {
        id: string;
        placeholder: string;
        value: string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };

    const rows: { label: string; inputs: InputType[] }[] = [
        {
            label: "MDP-USD",
            inputs: [
                { id: "inputLayerDetail.layerPdma.pdmaDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerPdma.pdmaDetailUsd },
                { id: "inputLayerDetail.layerMa.maDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerMa.maDetailUsd },
                { id: "inputLayerDetail.layerAv.avDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerAv.avDetailUsd },
                { id: "inputLayerDetail.layerLiability.liabilityDetailUsd", placeholder: "Amount", value: amounts.inputLayerDetail.layerLiability.liabilityDetailUsd },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "inputLayerDetail.layerPdma.pdmaDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerPdma.pdmaDetailIdr },
                { id: "inputLayerDetail.layerMa.maDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerMa.maDetailIdr },
                { id: "inputLayerDetail.layerAv.avDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerAv.avDetailIdr },
                { id: "inputLayerDetail.layerLiability.liabilityDetailIdr", placeholder: "Amount", value: amounts.inputLayerDetail.layerLiability.liabilityDetailIdr },
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

    const readonlyRows = [
        {
            label: "MDP - USD",
            inputs: [
                { id: "pdmaShareUsd", value: results.inputShare.sharePdma.pdmaShareUsd, readonly: true, placeholder: "" },
                { id: "maShareUsd", value: results.inputShare.shareMa.maShareUsd, readonly: true, placeholder: "" },
                { id: "avShareUsd", value: results.inputShare.shareAv.avShareUsd, readonly: true, placeholder: "" },
                { id: "liabilityShareUsd", value: results.inputShare.shareLiability.liabilityShareUsd, readonly: true, placeholder: "" },
            ],
        },
        {
            label: "MDP - IDR",
            inputs: [
                { id: "pdmaShareIdr", value: results.inputShare.sharePdma.pdmaShareIdr, readonly: true, placeholder: "" },
                { id: "maShareIdr", value: results.inputShare.shareMa.maShareIdr, readonly: true, placeholder: "" },
                { id: "avShareIdr", value: results.inputShare.shareAv.avShareIdr, readonly: true, placeholder: "" },
                { id: "liabilityShareIdr", value: results.inputShare.shareLiability.liabilityShareIdr, readonly: true, placeholder: "" },
            ],
        },
    ];

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Layer Details</h1>
            {rows.map((row) => (
                <InputGroup
                    key={row.label}
                    label={row.label}
                    inputs={row.inputs.map((input) => ({
                        ...input,
                        onChange: input.onChange || handleLocalInputChange,
                    }))}
                />
            ))}
            <h1 className="text-lg font-bold mb-4">Swiss Re Share</h1>
            {readonlyRows.map((row) => (
                <InputGroup
                    key={row.label}
                    label={row.label}
                    inputs={row.inputs}
                />
            ))}
        </div>
    );
};

export default LayerDetail;
