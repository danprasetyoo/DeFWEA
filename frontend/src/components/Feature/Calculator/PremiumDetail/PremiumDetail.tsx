import React, { useState } from "react";
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

        setAmounts((prev) => ({ ...prev, [id]: validValue }));
        handleInputChange({ target: { id, value: validValue } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAmounts((prev) => ({ ...prev, [id]: value }));
        handleInputChange({ target: { id, value } } as React.ChangeEvent<HTMLInputElement>);
    };

    const inputGroups = [
        {
            label: "Adjustment Premium - USD",
            inputs: [
                { id: "pdmaPremiumUsd", name: "inputPremium.premiumPdma.pdmaPremiumUsd", placeholder: "Amount", value: amounts.pdmaPremiumUsd, onChange: handleAmountInput },
                { id: "maPremiumUsd", name: "inputPremium.premiumMa.maPremiumUsd", placeholder: "Amount", value: amounts.maPremiumUsd, onChange: handleAmountInput },
                { id: "avPremiumUsd", name: "inputPremium.premiumAv.avPremiumUsd", placeholder: "Amount", value: amounts.avPremiumUsd, onChange: handleAmountInput },
                { id: "liabilityPremiumUsd", name: "inputPremium.premiumLiability.liabilityPremiumUsd", placeholder: "Amount", value: amounts.liabilityPremiumUsd, onChange: handleAmountInput },
            ],
        },
        {
            label: "Adjustment Premium - IDR",
            inputs: [
                { id: "pdmaPremiumIdr", name: "inputPremium.premiumPdma.pdmaPremiumIdr", placeholder: "Amount", value: amounts.pdmaPremiumIdr, onChange: handleAmountInput },
                { id: "maPremiumIdr", name: "inputPremium.premiumMa.maPremiumIdr", placeholder: "Amount", value: amounts.maPremiumIdr, onChange: handleAmountInput },
                { id: "avPremiumIdr", name: "inputPremium.premiumAv.avPremiumIdr", placeholder: "Amount", value: amounts.avPremiumIdr, onChange: handleAmountInput },
                { id: "liabilityPremiumIdr", name: "inputPremium.premiumLiability.liabilityPremiumIdr", placeholder: "Amount", value: amounts.liabilityPremiumIdr, onChange: handleAmountInput },
            ],
        },
        {
            label: "Share",
            inputs: [
                { id: "pdmaPremiumShare", name: "inputPremium.premiumPdma.pdmaPremiumShare", placeholder: "Percentage", value: amounts.pdmaPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "pdmaPremiumShare") },
                { id: "maPremiumShare", name: "inputPremium.premiumMa.maPremiumShare", placeholder: "Percentage", value: amounts.maPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "maPremiumShare") },
                { id: "avPremiumShare", name: "inputPremium.premiumAv.avPremiumShare", placeholder: "Percentage", value: amounts.avPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "avPremiumShare") },
                { id: "liabilityPremiumShare", name: "inputPremium.premiumLiability.liabilityPremiumShare", placeholder: "Percentage", value: amounts.liabilityPremiumShare, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePercentageChange(e, "liabilityPremiumShare") },
            ],
        },
    ];

    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Prior Year Adjustment Premium</label>
            {inputGroups.map((group) => (
                <InputGroup key={group.label} label={group.label} inputs={group.inputs} />
            ))}
        </div>
    );
};

export default PremiumDetail;
