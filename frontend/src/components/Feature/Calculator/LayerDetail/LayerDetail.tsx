import React, { useState } from "react";
import InputGroup from "./InputGroup";

interface LayerDetailProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LayerDetail: React.FC<LayerDetailProps> = ({ handleInputChange }) => {
    const [amounts, setAmounts] = useState<Record<string, string>>({
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

    // Handle percentage change (e.g., Share)
    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        let numericValue = value.replace("%", ""); // Remove the '%' sign if present
        let validValue = numericValue;

        if (/^\d*\.?\d+$/.test(numericValue)) {
            if (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 100) {
                validValue = numericValue + "%";
            } else {
                validValue = "100%"; // Cap value at 100%
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

    // Handle amount input (e.g., USD/IDR)
    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        let validValue = value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters, except for dot

        // Optional: Limit to max 2 decimal places
        if (validValue.split(".").length > 2) {
            validValue = validValue.slice(0, validValue.lastIndexOf("."));
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

    const rows = [
        {
            label: "MDP-USD",
            inputs: [
                { id: "pdmaDetailUsd", name: "inputLayerDetail.layerPdma.pdmaDetailUsd", placeholder: "Amount" },
                { id: "maDetailUsd", name: "inputLayerDetail.layerMa.maDetailUsd", placeholder: "Amount" },
                { id: "avDetailUsd", name: "inputLayerDetail.layerAv.avDetailUsd", placeholder: "Amount" },
                { id: "liabilityDetailUsd", name: "inputLayerDetail.layerLiability.liabilityDetailUsd", placeholder: "Amount" },
            ],
        },
        {
            label: "MDP-IDR",
            inputs: [
                { id: "pdmaDetailIdr", name: "inputLayerDetail.layerPdma.pdmaDetailIdr", placeholder: "Amount" },
                { id: "maDetailIdr", name: "inputLayerDetail.layerMa.maDetailIdr", placeholder: "Amount" },
                { id: "avDetailIdr", name: "inputLayerDetail.layerAv.avDetailIdr", placeholder: "Amount" },
                { id: "liabilityDetailIdr", name: "inputLayerDetail.layerLiability.liabilityDetailIdr", placeholder: "Amount" },
            ],
        },
        {
            label: "Share",
            inputs: [
                { id: "pdmaDetailShare", name: "inputLayerDetail.layerPdma.pdmaDetailShare", placeholder: "Percentage" },
                { id: "maDetailShare", name: "inputLayerDetail.layerMa.maDetailShare", placeholder: "Percentage" },
                { id: "avDetailShare", name: "inputLayerDetail.layerAv.avDetailShare", placeholder: "Percentage" },
                { id: "liabilityDetailShare", name: "inputLayerDetail.layerLiability.liabilityDetailShare", placeholder: "Percentage" },
            ],
        },
    ];

    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Layer Details</label>
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div></div>
                <div>
                    <label htmlFor="pdmaDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        PDMA Layer 1A
                    </label>
                </div>
                <div>
                    <label htmlFor="maDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Marine & Aviation Layer 1
                    </label>
                </div>
                <div>
                    <label htmlFor="avDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Marine & Aviation Layer 2
                    </label>
                </div>
                <div>
                    <label htmlFor="liabilityDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Liability Layer 1
                    </label>
                </div>
            </div>
            {rows.map((row) => (
                <InputGroup
                    key={row.label}
                    label={row.label}
                    inputs={row.inputs.map((input) => ({
                        ...input,
                        value: amounts[input.id],
                        onChange: input.placeholder === "Percentage"
                            ? (e) => handlePercentageChange(e, input.id)
                            : handleAmountInput,
                    }))}
                />
            ))}
        </div>
    );
};

export default LayerDetail;
