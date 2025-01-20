import React, { useState, useEffect } from "react";
import InputGroup from "./InputGroup";

type PremiumDetailProps = {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFieldValue: (field: string, value: any) => void;
};

const PremiumDetail: React.FC<PremiumDetailProps> = ({ handleInputChange, setFieldValue }) => {
    const [amounts, setAmounts] = useState({
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
    });

    const [results, setResults] = useState({
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
                { id: "inputPremium.premiumPdma.pdmaPremiumUsd", placeholder: "Amount", value: amounts.inputPremium.premiumPdma.pdmaPremiumUsd },
                { id: "inputPremium.premiumMa.maPremiumUsd", placeholder: "Amount", value: amounts.inputPremium.premiumMa.maPremiumUsd },
                { id: "inputPremium.premiumAv.avPremiumUsd", placeholder: "Amount", value: amounts.inputPremium.premiumAv.avPremiumUsd },
                { id: "inputPremium.premiumLiability.liabilityPremiumUsd", placeholder: "Amount", value: amounts.inputPremium.premiumLiability.liabilityPremiumUsd },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "inputPremium.premiumPdma.pdmaPremiumIdr", placeholder: "Amount", value: amounts.inputPremium.premiumPdma.pdmaPremiumIdr },
                { id: "inputPremium.premiumMa.maPremiumIdr", placeholder: "Amount", value: amounts.inputPremium.premiumMa.maPremiumIdr },
                { id: "inputPremium.premiumAv.avPremiumIdr", placeholder: "Amount", value: amounts.inputPremium.premiumAv.avPremiumIdr },
                { id: "inputPremium.premiumLiability.liabilityPremiumIdr", placeholder: "Amount", value: amounts.inputPremium.premiumLiability.liabilityPremiumIdr },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "inputPremium.premiumPdma.pdmaPremiumShare", placeholder: "Percentage", value: amounts.inputPremium.premiumPdma.pdmaPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputPremium.premiumPdma.pdmaPremiumShare") },
                { id: "inputPremium.premiumMa.maPremiumShare", placeholder: "Percentage", value: amounts.inputPremium.premiumMa.maPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputPremium.premiumMa.maPremiumShare") },
                { id: "inputPremium.premiumAv.avPremiumShare", placeholder: "Percentage", value: amounts.inputPremium.premiumAv.avPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputPremium.premiumAv.avPremiumShare") },
                { id: "inputPremium.premiumLiability.liabilityPremiumShare", placeholder: "Percentage", value: amounts.inputPremium.premiumLiability.liabilityPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "inputPremium.premiumLiability.liabilityPremiumShare") },
            ],
        },
    ];

    const readonlyRows = [
        {
            label: "Adjustment Premium - USD",
            inputs: [
                { id: "pdmaSharePremiumUsd", value: results.inputShare.sharePdma.pdmaSharePremiumUsd, readonly: true, placeholder: "" },
                { id: "maSharePremiumUsd", value: results.inputShare.shareMa.maSharePremiumUsd, readonly: true, placeholder: "" },
                { id: "avSharePremiumUsd", value: results.inputShare.shareAv.avSharePremiumUsd, readonly: true, placeholder: "" },
                { id: "liabilitySharePremiumUsd", value: results.inputShare.shareLiability.liabilitySharePremiumUsd, readonly: true, placeholder: "" },
            ],
        },
        {
            label: "Adjustment Premium - IDR",
            inputs: [
                { id: "pdmaSharePremiumIdr", value: results.inputShare.sharePdma.pdmaSharePremiumIdr, readonly: true, placeholder: "" },
                { id: "maSharePremiumIdr", value: results.inputShare.shareMa.maSharePremiumIdr, readonly: true, placeholder: "" },
                { id: "avSharePremiumIdr", value: results.inputShare.shareAv.avSharePremiumIdr, readonly: true, placeholder: "" },
                { id: "liabilitySharePremiumIdr", value: results.inputShare.shareLiability.liabilitySharePremiumIdr, readonly: true, placeholder: "" },
            ],
        },
    ];

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Premium Details</h1>
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

export default PremiumDetail;
