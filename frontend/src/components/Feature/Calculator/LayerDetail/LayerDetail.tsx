import React, { useState, useEffect } from "react";
import InputGroup from "./InputGroup";

type LayerDetailProps = {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LayerDetail: React.FC<LayerDetailProps> = ({ handleInputChange }) => {
    const [amounts, setAmounts] = useState({
        pdmaDetailUsd: "",
        pdmaDetailIdr: "",
        pdmaDetailShare: "",
        maDetailUsd: "",
        maDetailIdr: "",
        maDetailShare: "",
        avDetailUsd: "",
        avDetailIdr: "",
        avDetailShare: "",
        liabilityDetailUsd: "",
        liabilityDetailIdr: "",
        liabilityDetailShare: "",
    });

    const [results, setResults] = useState({
        pdmaShareUsd: 0,
        pdmaShareIdr: 0,
        maShareUsd: 0,
        maShareIdr: 0,
        avShareUsd: 0,
        avShareIdr: 0,
        liabilityShareUsd: 0,
        liabilityShareIdr: 0,
    });

    const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const validValue = value.replace(/[^0-9.]/g, "");

        setAmounts((prev) => ({
            ...prev,
            [id]: validValue,
        }));

        handleInputChange(e);
    };

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        let numericValue = value.replace("%", "");
        let validValue = numericValue;

        if (/^\d*\.?\d+$/.test(numericValue)) {
            if (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 100) {
                validValue = numericValue + "%";
            } else {
                validValue = "100%";
            }
        }

        setAmounts((prevAmounts) => ({
            ...prevAmounts,
            [id]: validValue,
        }));

        handleInputChange({
            target: {
                id,
                value: validValue,
            },
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

        setResults({
            pdmaShareUsd: calculateShare(updatedAmounts.pdmaDetailUsd, updatedAmounts.pdmaDetailShare),
            pdmaShareIdr: calculateShare(updatedAmounts.pdmaDetailIdr, updatedAmounts.pdmaDetailShare),
            maShareUsd: calculateShare(updatedAmounts.maDetailUsd, updatedAmounts.maDetailShare),
            maShareIdr: calculateShare(updatedAmounts.maDetailIdr, updatedAmounts.maDetailShare),
            avShareUsd: calculateShare(updatedAmounts.avDetailUsd, updatedAmounts.avDetailShare),
            avShareIdr: calculateShare(updatedAmounts.avDetailIdr, updatedAmounts.avDetailShare),
            liabilityShareUsd: calculateShare(updatedAmounts.liabilityDetailUsd, updatedAmounts.liabilityDetailShare),
            liabilityShareIdr: calculateShare(updatedAmounts.liabilityDetailIdr, updatedAmounts.liabilityDetailShare),
        });
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
                { id: "pdmaDetailUsd", placeholder: "Amount", value: amounts.pdmaDetailUsd },
                { id: "maDetailUsd", placeholder: "Amount", value: amounts.maDetailUsd },
                { id: "avDetailUsd", placeholder: "Amount", value: amounts.avDetailUsd },
                { id: "liabilityDetailUsd", placeholder: "Amount", value: amounts.liabilityDetailUsd },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "pdmaDetailIdr", placeholder: "Amount", value: amounts.pdmaDetailIdr },
                { id: "maDetailIdr", placeholder: "Amount", value: amounts.maDetailIdr },
                { id: "avDetailIdr", placeholder: "Amount", value: amounts.avDetailIdr },
                { id: "liabilityDetailIdr", placeholder: "Amount", value: amounts.liabilityDetailIdr },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "pdmaDetailShare", placeholder: "Percentage", value: amounts.pdmaDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "pdmaDetailShare") },
                { id: "maDetailShare", placeholder: "Percentage", value: amounts.maDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "maDetailShare") },
                { id: "avDetailShare", placeholder: "Percentage", value: amounts.avDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "avDetailShare") },
                { id: "liabilityDetailShare", placeholder: "Percentage", value: amounts.liabilityDetailShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "liabilityDetailShare") },
            ],
        },
    ];

    const readonlyRows = [
        {
            label: "MDP - USD",
            inputs: [
                { id: "pdmaShareUsd", value: results.pdmaShareUsd.toFixed(2), readonly: true, placeholder: "" },
                { id: "maShareUsd", value: results.maShareUsd.toFixed(2), readonly: true, placeholder: "" },
                { id: "avShareUsd", value: results.avShareUsd.toFixed(2), readonly: true, placeholder: "" },
                { id: "liabilityShareUsd", value: results.liabilityShareUsd.toFixed(2), readonly: true, placeholder: "" },
            ],
        },
        {
            label: "MDP - IDR",
            inputs: [
                { id: "pdmaShareIdr", value: results.pdmaShareIdr.toFixed(2), readonly: true, placeholder: "" },
                { id: "maShareIdr", value: results.maShareIdr.toFixed(2), readonly: true, placeholder: "" },
                { id: "avShareIdr", value: results.avShareIdr.toFixed(2), readonly: true, placeholder: "" },
                { id: "liabilityShareIdr", value: results.liabilityShareIdr.toFixed(2), readonly: true, placeholder: "" },
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
