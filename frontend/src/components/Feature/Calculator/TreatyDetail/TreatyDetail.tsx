import React, { useState } from "react";
import InputGroup from "./InputGroup";
import TreatyValues from "./TreatyValues";

interface TreatyDetailProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TreatyDetail({ handleInputChange }: TreatyDetailProps) {
    const [amounts, setAmounts] = useState(JSON.parse(JSON.stringify(TreatyValues)));

    const updateNestedField = (obj: any, path: string[], value: any) => {
        const [key, ...rest] = path;
        if (!rest.length) {
            obj[key] = value;
            return;
        }
        if (!obj[key]) obj[key] = {};
        updateNestedField(obj[key], rest, value);
    };

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        const numericValue = value.replace("%", "");
        let validValue = numericValue;

        if (/^\d*\.?\d+$/.test(numericValue)) {
            if (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 100) {
                validValue = numericValue + "%";
            } else {
                validValue = "100%";
            }
        }

        const path = id.split(".");
        const updatedAmounts = { ...amounts };
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

        setAmounts((prevAmounts: any) => ({
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

        const path = id.split(".");
        const updatedAmounts = { ...amounts };
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

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
                        currentId: "inputTreatyDetail.treatyCurrentYear.currentExchange",
                        priorId: "inputTreatyDetail.treatyPriorYear.priorExchange",
                        type: "text",
                        priorLabel: "",
                    },
                ]}
                amounts={amounts}
                handleChange={handleAmountInput}
                label={"Treaty Details"}
            />
            <InputGroup
                fields={[
                    {
                        currentLabel: "Reinsurers' Margin",
                        currentId: "inputTreatyDetail.treatyCurrentYear.currentMargin",
                        priorId: "inputTreatyDetail.treatyPriorYear.priorMargin",
                        type: "percentage",
                        priorLabel: "",
                    },
                    {
                        currentLabel: "Brokerage",
                        currentId: "inputTreatyDetail.treatyCurrentYear.currentBrokerage",
                        priorId: "inputTreatyDetail.treatyPriorYear.priorBrokerage",
                        type: "percentage",
                        priorLabel: "",
                    },
                    {
                        currentLabel: "Interest Rate",
                        currentId: "inputTreatyDetail.treatyCurrentYear.currentInterest",
                        priorId: "inputTreatyDetail.treatyPriorYear.priorInterest",
                        type: "percentage",
                        priorLabel: "",
                    },
                    {
                        currentLabel: "LAP",
                        currentId: "inputTreatyDetail.treatyCurrentYear.currentLAP",
                        priorId: "inputTreatyDetail.treatyPriorYear.priorLAP",
                        type: "percentage",
                        priorLabel: "",
                    },
                ]}
                amounts={amounts}
                handleChange={handlePercentageChange}
                label={""}
            />
            <InputGroup
                fields={[
                    {
                        currentLabel: "Maintenance Credit",
                        currentId: "inputTreatyDetail.treatyCurrentYear.currentMaintenance",
                        priorId: "inputTreatyDetail.treatyPriorYear.priorMaintenance",
                        type: "text",
                        priorLabel: "",
                    },
                ]}
                amounts={amounts}
                handleChange={handleAmountInput}
                label={""}
            />
        </div>
    );
}

export default TreatyDetail;