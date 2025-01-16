import React, { useState } from "react";
import InputGroup from "./InputGroup";

interface TretyDetailProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TretyDetail({ handleInputChange }: TretyDetailProps) {
    const [amounts, setAmounts] = useState({
        currentExchange: "",
        priorExchange: "",
        currentMargin: "",
        priorMargin: "",
        currentBrokerage: "",
        priorBrokerage: "",
        currentInterest: "",
        priorInterest: "",
        currentLAP: "",
        priorLAP: "",
        currentMaintenance: "",
        priorMaintenance: "",
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

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        let validValue = value.replace(/[^0-9.]/g, "");

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

    return (
        <div>
            <InputGroup
                fields={[
                    {
                        currentLabel: "Exchange Rate",
                        currentId: "currentExchange",
                        priorId: "priorExchange",
                        type: "text",
                        priorLabel: ""
                    },
                ]}
                amounts={amounts}
                handleChange={handleAmountInput} label={"Treaty Details"} />
            <InputGroup
                fields={[
                    {
                        currentLabel: "Reinsurers' Margin",
                        currentId: "currentMargin",
                        priorId: "priorMargin",
                        type: "percentage",
                        priorLabel: ""
                    },
                    {
                        currentLabel: "Brokerage",
                        currentId: "currentBrokerage",
                        priorId: "priorBrokerage",
                        type: "percentage",
                        priorLabel: ""
                    },
                    {
                        currentLabel: "Interest Rate",
                        currentId: "currentInterest",
                        priorId: "priorInterest",
                        type: "percentage",
                        priorLabel: ""
                    },
                    {
                        currentLabel: "LAP",
                        currentId: "currentLAP",
                        priorId: "priorLAP",
                        type: "percentage",
                        priorLabel: ""
                    },
                ]}
                amounts={amounts}
                handleChange={handlePercentageChange} label={""} />
            <InputGroup
                fields={[
                    {
                        currentLabel: "Maintenance Credit",
                        currentId: "currentMaintenance",
                        priorId: "priorMaintenance",
                        type: "text",
                        priorLabel: ""
                    },
                ]}
                amounts={amounts}
                handleChange={handleAmountInput} label={""} />
        </div>
    );
}

export default TretyDetail;
