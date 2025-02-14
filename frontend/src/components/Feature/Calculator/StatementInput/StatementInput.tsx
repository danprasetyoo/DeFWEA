import React, { useEffect, useRef, useState } from "react";
import { Datepicker } from 'flowbite-datepicker';
import DateInput from './DateInput';
import OpeningFundInput from './OpeningFundInput';
import TreatyYearInput from './TreatyYearInput';

interface StatementInputProps {
    formData: {
        inputStatementDate: string;
        inputOpeningfund: string;
        inputStatementPeriod: string;
        inputTreatyYear: number;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function StatementInput({ formData, handleInputChange, handleBlur }: StatementInputProps) {
    const statementDateRef = useRef<HTMLInputElement>(null);
    const statementPeriodRef = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(formData.inputOpeningfund);
    const [isNegative, setIsNegative] = useState<boolean>(parseFloat(formData.inputOpeningfund) < 0);

    useEffect(() => {
        setIsNegative(parseFloat(formData.inputOpeningfund) < 0);
    }, [formData.inputOpeningfund]);

    useEffect(() => {
        const setupDatepicker = (ref: React.RefObject<HTMLInputElement>, field: string) => {
            if (ref.current) {
                new Datepicker(ref.current, {
                    dateFormat: 'yyyy-MM-dd',
                    onChange: (selectedDate: string) => {
                        handleInputChange({
                            target: {
                                id: field,
                                value: selectedDate,
                            },
                        } as React.ChangeEvent<HTMLInputElement>);
                    },
                });
            }
        };

        setupDatepicker(statementDateRef, 'inputStatementDate');
        setupDatepicker(statementPeriodRef, 'inputStatementPeriod');
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setIsNegative(isChecked);

        const currentOpeningFund = parseFloat(formData.inputOpeningfund || '0');
        const newValue = isChecked ? -Math.abs(currentOpeningFund) : Math.abs(currentOpeningFund);

        handleInputChange({
            target: {
                id: 'inputOpeningfund',
                value: newValue.toString(),
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^-?\d*\.?\d*$/.test(value)) {
            setAmount(value);
            handleInputChange({
                target: {
                    id: 'inputOpeningfund',
                    value: value,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleTreatyYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^\d{0,4}$/.test(value)) {
            handleInputChange({
                target: {
                    id: 'inputTreatyYear',
                    value: value === "" ? "" : parseInt(value, 10),
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div>
            <DateInput
                id="inputStatementDate"
                label="Statement Date"
                inputRef={statementDateRef}
                value={formData.inputStatementDate}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
            />
            <OpeningFundInput
                amount={amount}
                isNegative={isNegative}
                handleCheckboxChange={handleCheckboxChange}
                handleAmountInput={handleAmountInput}
                handleBlur={handleBlur}
            />
            <DateInput
                id="inputStatementPeriod"
                label="Statement Period"
                inputRef={statementPeriodRef}
                value={formData.inputStatementPeriod}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
            />
            <TreatyYearInput
                value={formData.inputTreatyYear.toString()}
                handleInputChange={handleTreatyYearChange}
                handleBlur={handleBlur}
            />
        </div>
    );
}

export default StatementInput;
