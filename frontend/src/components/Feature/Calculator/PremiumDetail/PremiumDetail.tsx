import React, { useState, useEffect } from "react";
import InputGroup from "./InputGroup";

interface PremiumDetailProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PremiumDetail: React.FC<PremiumDetailProps> = ({ handleInputChange }) => {
    const [amounts, setAmounts] = useState({
        pdmaPremiumUsd: "",
        pdmaPremiumIdr: "",
        pdmaPremiumShare: "",
        maPremiumUsd: "",
        maPremiumIdr: "",
        maPremiumShare: "",
        avPremiumUsd: "",
        avPremiumIdr: "",
        avPremiumShare: "",
        liabilityPremiumUsd: "",
        liabilityPremiumIdr: "",
        liabilityPremiumShare: "",
    });

    const [results, setResults] = useState({
        pdmaSharePremiumUsd: 0,
        pdmaSharePremiumIdr: 0,
        maSharePremiumUsd: 0,
        maSharePremiumIdr: 0,
        avSharePremiumUsd: 0,
        avSharePremiumIdr: 0,
        liabilitySharePremiumUsd: 0,
        liabilitySharePremiumIdr: 0,
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
            pdmaSharePremiumUsd: calculateShare(updatedAmounts.pdmaPremiumUsd, updatedAmounts.pdmaPremiumShare),
            pdmaSharePremiumIdr: calculateShare(updatedAmounts.pdmaPremiumIdr, updatedAmounts.pdmaPremiumShare),
            maSharePremiumUsd: calculateShare(updatedAmounts.maPremiumUsd, updatedAmounts.maPremiumShare),
            maSharePremiumIdr: calculateShare(updatedAmounts.maPremiumIdr, updatedAmounts.maPremiumShare),
            avSharePremiumUsd: calculateShare(updatedAmounts.avPremiumUsd, updatedAmounts.avPremiumShare),
            avSharePremiumIdr: calculateShare(updatedAmounts.avPremiumIdr, updatedAmounts.avPremiumShare),
            liabilitySharePremiumUsd: calculateShare(updatedAmounts.liabilityPremiumUsd, updatedAmounts.liabilityPremiumShare),
            liabilitySharePremiumIdr: calculateShare(updatedAmounts.liabilityPremiumIdr, updatedAmounts.liabilityPremiumShare),
        });
    };

    useEffect(() => {
        recalculateResults(amounts);
    }, [amounts]);

    const rows = [
        {
            label: "Adjustment Premium - USD",
            inputs: [
                { id: "pdmaPremiumUsd", name: "pdmaPremiumUsd", placeholder: "Amount", value: amounts.pdmaPremiumUsd },
                { id: "maPremiumUsd", name: "maPremiumUsd", placeholder: "Amount", value: amounts.maPremiumUsd },
                { id: "avPremiumUsd", name: "avPremiumUsd", placeholder: "Amount", value: amounts.avPremiumUsd },
                { id: "liabilityPremiumUsd", name: "liabilityPremiumUsd", placeholder: "Amount", value: amounts.liabilityPremiumUsd },
            ],
        },
        {
            label: "Adjustment Premium - IDR",
            inputs: [
                { id: "pdmaPremiumIdr", name: "pdmaPremiumIdr", placeholder: "Amount", value: amounts.pdmaPremiumIdr },
                { id: "maPremiumIdr", name: "maPremiumIdr", placeholder: "Amount", value: amounts.maPremiumIdr },
                { id: "avPremiumIdr", name: "avPremiumIdr", placeholder: "Amount", value: amounts.avPremiumIdr },
                { id: "liabilityPremiumIdr", name: "liabilityPremiumIdr", placeholder: "Amount", value: amounts.liabilityPremiumIdr },
            ],
        },
        {
            label: "Share (%)",
            inputs: [
                { id: "pdmaPremiumShare", name: "pdmaPremiumShare", placeholder: "Percentage", value: amounts.pdmaPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "pdmaPremiumShare") },
                { id: "maPremiumShare", name: "maPremiumShare", placeholder: "Percentage", value: amounts.maPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "maPremiumShare") },
                { id: "avPremiumShare", name: "avPremiumShare", placeholder: "Percentage", value: amounts.avPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "avPremiumShare") },
                { id: "liabilityPremiumShare", name: "liabilityPremiumShare", placeholder: "Percentage", value: amounts.liabilityPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "liabilityPremiumShare") },
            ],
        },
    ];

    const readonlyRows = [
        {
            label: "Adjustment Premium - USD",
            inputs: [
                { id: "pdmaSharePremiumUsd", name: "pdmaSharePremiumUsd", value: results.pdmaSharePremiumUsd.toFixed(2) },
                { id: "maSharePremiumUsd", name: "maSharePremiumUsd", value: results.maSharePremiumUsd.toFixed(2) },
                { id: "avSharePremiumUsd", name: "avSharePremiumUsd", value: results.avSharePremiumUsd.toFixed(2) },
                { id: "liabilitySharePremiumUsd", name: "liabilitySharePremiumUsd", value: results.liabilitySharePremiumUsd.toFixed(2) },
            ],
        },
        {
            label: "Adjustment Premium - IDR",
            inputs: [
                { id: "pdmaSharePremiumIdr", name: "pdmaSharePremiumIdr", value: results.pdmaSharePremiumIdr.toFixed(2) },
                { id: "maSharePremiumIdr", name: "maSharePremiumIdr", value: results.maSharePremiumIdr.toFixed(2) },
                { id: "avSharePremiumIdr", name: "avSharePremiumIdr", value: results.avSharePremiumIdr.toFixed(2) },
                { id: "liabilitySharePremiumIdr", name: "liabilitySharePremiumIdr", value: results.liabilitySharePremiumIdr.toFixed(2) },
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
                        onChange: 'onChange' in input ? input.onChange : handleLocalInputChange,
                    }))}
                />
            ))}
            <h1 className="text-lg font-bold mb-4">Swiss Re Share</h1>
            {readonlyRows.map((row) => (
                <InputGroup
                    key={row.label}
                    label={row.label}
                    inputs={row.inputs.map((input) => ({
                        ...input,
                        readonly: true,
                        placeholder: "",
                    }))}
                />
            ))}
        </div>
    );
};

export default PremiumDetail;
