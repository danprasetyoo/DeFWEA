import React from "react";

const OpeningFundInput = ({ amount, isNegative, handleCheckboxChange, handleAmountInput }: {
    amount: string;
    isNegative: boolean;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAmountInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => (
    <div className="relative max-w-sm mt-4">
        <label htmlFor="inputOpeningfund" className="form-label text-md font-medium text-gray-900 dark:text-white">
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
                <label htmlFor="negativeCheckbox" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">
                    Negative
                </label>
            </div>
            <input
                type="number"
                id="inputOpeningfund"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountInput}
                step="0.01"
            />
        </div>
    </div>
);


export default OpeningFundInput;