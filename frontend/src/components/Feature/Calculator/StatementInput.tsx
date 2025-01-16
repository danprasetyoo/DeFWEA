import React, { useEffect, useRef, useState } from "react";
import { Datepicker } from 'flowbite-datepicker';

interface StatementInputProps {
    formData: {
        inputStatementDate: string;
        inputOpeningfund: string;
        inputStatementPeriod: string;
        inputTreatyYear: string;
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
    }, [
        formData.inputOpeningfund,
        isNegative,
    ]);

    useEffect(() => {
        if (statementDateRef.current) {
            new Datepicker(statementDateRef.current, {
                dateFormat: 'yyyy-mm-dd',
                onChange: (selectedDate: any) => {
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
                dateFormat: 'yyyy-mm-dd',
                onChange: (selectedDate: any) => {
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
            handleInputChange(e);
        }
    };


    return (
        <div>
            <div className="relative max-w-sm">
                <div>
                    <label
                        htmlFor="inputStatementDate"
                        className="form-label text-md font-medium text-gray-900 dark:text-white"
                    >
                        Statement Date
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        id="inputStatementDate"
                        ref={statementDateRef}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.inputStatementDate}
                        placeholder="Select date"
                        onChange={handleInputChange}
                        required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="relative max-w-sm mt-4">
                <label
                    htmlFor="inputOpeningfund"
                    className="form-label text-md font-medium text-gray-900 dark:text-white"
                >
                    Opening Fund
                </label>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="negativeCheckbox"
                            checked={isNegative}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="negativeCheckbox"
                            className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                        >
                            Negative
                        </label>
                    </div>

                    <input
                        type="text"
                        id="inputOpeningfund"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amount}
                        onChange={handleAmountInput}
                        required
                    />
                </div>
            </div>

            <div className="relative max-w-sm mt-4">
                <div>
                    <label
                        htmlFor="inputStatementPeriod"
                        className="form-label text-md font-medium text-gray-900 dark:text-white"
                    >
                        Statement Period
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        id="inputStatementPeriod"
                        ref={statementPeriodRef}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.inputStatementPeriod}
                        placeholder="Select date"
                        onChange={handleInputChange}
                        required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="relative max-w-sm mt-4">
                <div>
                    <label
                        htmlFor="inputTreatyYear"
                        className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                        Treaty Year
                    </label>
                </div>
                <input
                    type="text"
                    id="inputTreatyYear"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter year"
                    value={formData.inputTreatyYear}
                    onChange={handleTreatyYearChange}
                    required
                    maxLength={4}
                />
            </div>
        </div>
    );
}

export default StatementInput;
