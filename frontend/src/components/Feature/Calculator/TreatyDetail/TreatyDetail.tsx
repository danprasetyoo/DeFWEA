import React, { useState } from "react";
import InputGroup from "./InputGroup";
import TreatyValues from "./TreatyValues";

interface TreatyDetailProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formikError?: any;
    formikTouched?: any;
}

function TreatyDetail({ handleInputChange, formikError, formikTouched }: TreatyDetailProps) {
    const [amounts, setAmounts] = useState(() => JSON.parse(JSON.stringify(TreatyValues.inputTreatyDetail)));

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
        let numericValue = value.replace("%", "");
        let validValue = numericValue;

        if (/^\d*\.?\d+$/.test(numericValue)) {
            if (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 100) {
                validValue = numericValue + "%";
            } else {
                validValue = "100%";
            }
        }

        setAmounts((prevAmounts: typeof amounts) => ({
            ...prevAmounts,
            [id]: validValue,
        }));

        handleInputChange({
            target: {
                id,
                value: parseFloat(validValue),
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const numericValue = value.replace(/[^0-9.]/g, "");
        let validValue = numericValue;

        if (numericValue.split(".").length > 2) {
            validValue = numericValue.slice(0, numericValue.lastIndexOf("."));
        }

        const num = parseFloat(validValue);

        const path = id.split(".");
        const updatedAmounts = { ...amounts };
        updateNestedField(updatedAmounts, path, num);
        setAmounts(updatedAmounts);

        handleInputChange({
            target: {
                id,
                value: num,
                name: id,
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div>
            <InputGroup
                fields={[
                    {
                        currentLabel: "Exchange Rate",
                        currentId: "inputTreatyDetail.treatyCurrentYear.Exchange",
                        priorId: "inputTreatyDetail.treatyPriorYear.Exchange",
                        type: "text",
                        priorLabel: "",
                    },
                ]}
                amounts={amounts}
                handleChange={handleAmountInput}
                label={"Detail Treaty"}
                formikError={formikError}
                formikTouched={formikTouched}
            />
            <InputGroup
                fields={[
                    {
                        currentLabel: "Margin Reasuransi",
                        currentId: "inputTreatyDetail.treatyCurrentYear.Margin",
                        priorId: "inputTreatyDetail.treatyPriorYear.Margin",
                        type: "percentage",
                        priorLabel: "",
                    },
                    {
                        currentLabel: "Brokerage",
                        currentId: "inputTreatyDetail.treatyCurrentYear.Brokerage",
                        priorId: "inputTreatyDetail.treatyPriorYear.Brokerage",
                        type: "percentage",
                        priorLabel: "",
                    },
                    {
                        currentLabel: "Interest Rate",
                        currentId: "inputTreatyDetail.treatyCurrentYear.Interest",
                        priorId: "inputTreatyDetail.treatyPriorYear.Interest",
                        type: "percentage",
                        priorLabel: "",
                    },
                    {
                        currentLabel: "LAP",
                        currentId: "inputTreatyDetail.treatyCurrentYear.LAP",
                        priorId: "inputTreatyDetail.treatyPriorYear.LAP",
                        type: "percentage",
                        priorLabel: "",
                    },
                ]}
                amounts={amounts}
                handleChange={handlePercentageChange}
                label={""}
                formikError={formikError}
                formikTouched={formikTouched}
            />
            <InputGroup
                fields={[
                    {
                        currentLabel: "Maintenance",
                        currentId: "inputTreatyDetail.treatyCurrentYear.Maintenance",
                        priorId: "inputTreatyDetail.treatyPriorYear.Maintenance",
                        type: "text",
                        priorLabel: "",
                    },
                ]}
                amounts={amounts}
                handleChange={handleAmountInput}
                label={""}
                formikError={formikError}
                formikTouched={formikTouched}
            />
        </div>
    );
}

export default TreatyDetail;
