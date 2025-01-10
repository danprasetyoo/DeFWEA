import React from "react";

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
    return (
        <div>
            {/* Statement Date */}
            <div>
                <label
                    htmlFor="inputStatementDate"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Statement date as at
                </label>
                <input
                    type="text"
                    id="inputStatementDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="DD/MM/YYYY"
                    value={formData.inputStatementDate}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Opening Fund */}
            <div>
                <label
                    htmlFor="inputOpeningfund"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Opening fund
                </label>
                <input
                    type="number"
                    id="inputOpeningfund"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Amount"
                    value={formData.inputOpeningfund}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Statement Period Start */}
            <div>
                <label
                    htmlFor="inputStatementPeriod"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Statement period start
                </label>
                <input
                    type="text"
                    id="inputStatementPeriod"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="DD/MM/YYYY"
                    value={formData.inputStatementPeriod}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Treaty Year */}
            <div>
                <label
                    htmlFor="inputTreatyYear"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Treaty Year
                </label>
                <input
                    type="text"
                    id="inputTreatyYear"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="DD/MM/YYYY"
                    value={formData.inputTreatyYear}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    );
}

export default StatementInput;
