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
}

function StatementInput({ formData, handleInputChange }: StatementInputProps) {
    const statementDateRef = useRef<HTMLInputElement>(null);
    const statementPeriodRef = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(formData.inputOpeningfund);
    const [isNegative, setIsNegative] = useState<boolean>(false);

    useEffect(() => {
        console.log("Opening Fund:", formData.inputOpeningfund);
        console.log("Is Negative:", isNegative);
    }, [formData.inputOpeningfund, isNegative]);

    useEffect(() => {
        if (statementDateRef.current) {
            new Datepicker(statementDateRef.current, {
                dateFormat: 'yyyy-mm-dd', // Important: Use yyyy-mm-dd
                onChange: (selectedDate: string) => { // selectedDate is already a string in yyyy-mm-dd format
                    handleInputChange({
                        target: {
                            id: 'inputStatementDate',
                            value: selectedDate,
                        },
                    } as React.ChangeEvent<HTMLInputElement>);
                },
            });
        }

        if (statementPeriodRef.current) {
            new Datepicker(statementPeriodRef.current, {
                dateFormat: 'yyyy-mm-dd', // Important: Use yyyy-mm-dd
                onChange: (selectedDate: string) => { // selectedDate is already a string in yyyy-mm-dd format
                    handleInputChange({
                        target: {
                            id: 'inputStatementPeriod',
                            value: selectedDate,
                        },
                    } as React.ChangeEvent<HTMLInputElement>);
                },
            });
        }
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setIsNegative(isChecked);

        const currentOpeningFund = parseFloat(formData.inputOpeningfund || '0');
        const newValue = isChecked ? -Math.abs(currentOpeningFund) : Math.abs(currentOpeningFund);

        if (currentOpeningFund !== newValue) {
            handleInputChange({
                target: {
                    id: 'inputOpeningfund',
                    value: newValue.toString(),
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
            handleInputChange({
                target: {
                    id: 'inputOpeningfund',
                    value: value,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        } else {
            console.warn('Rejected');
        }
    };

    const handleTreatyYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^\d{0,4}$/.test(value)) {
            const numericValue = value === "" ? "" : parseInt(value, 10); // Parse to integer or empty string
            handleInputChange({
                target: {
                    id: 'inputTreatyYear',
                    value: numericValue,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div>
            <DateInput
                id="inputStatementDate"
                label="Statement Date"
                ref={statementDateRef}
                value={formData.inputStatementDate}
                handleInputChange={handleInputChange}
            />
            <OpeningFundInput
                amount={amount}
                isNegative={isNegative}
                handleCheckboxChange={handleCheckboxChange}
                handleAmountInput={handleAmountInput}
            />
            <DateInput
                id="inputStatementPeriod"
                label="Statement Period"
                ref={statementPeriodRef}
                value={formData.inputStatementPeriod}
                handleInputChange={handleInputChange}
            />
            <TreatyYearInput
                value={formData.inputTreatyYear.toString()}
                handleInputChange={handleTreatyYearChange}
            />
        </div>
    );
}

export default StatementInput;