import React, { useState } from "react";

interface TretyDetailProps {
    formData: {
        inputTreatyDetail: {
            treatyCurrentYear: {
                currentExchange: string;
                currentMargin: string;
                currentBrokerage: string;
                currentInterest: string;
                currentLAP: string;
                currentMaintenance: string;
            };
            treatyPriorYear: {
                priorExchange: string;
                priorMargin: string;
                priorBrokerage: string;
                priorInterest: string;
                priorLAP: string;
                priorMaintenance: string;
            };
        };
    };
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
        priorMaintenance: ""
    });

    // Function to handle conversion of percentage to decimal when saving or submitting
    // const convertToDecimal = (value: string) => {
    //     if (value.includes('%')) {
    //         value = value.replace('%', ''); // Remove the percent sign
    //     }
    //     const numericValue = parseFloat(value);
    //     return isNaN(numericValue) ? "" : (numericValue / 100).toString(); // Convert to decimal
    // };

    // Handle input for percentage fields (Brokerage, Interest, LAP) with a range check
    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        let numericValue = value.replace('%', ''); // Remove the '%' sign if present
        let validValue = numericValue;

        // Check if the value is a valid number and within the range 0 - 100
        if (/^\d*\.?\d+$/.test(numericValue)) {
            if (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 100) {
                validValue = numericValue + "%";
            } else {
                validValue = "100%";
            }
        }

        setAmounts(prevAmounts => ({
            ...prevAmounts,
            [id]: validValue
        }));

        handleInputChange({
            target: {
                id,
                value: validValue
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Handle numeric input fields (Exchange rate, Maintenance, etc.)
    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAmounts(prevAmounts => ({
            ...prevAmounts,
            [id]: value
        }));

        handleInputChange({
            target: {
                id,
                value
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div>
            {/* Grid layout for Label */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="TreatyDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Treaty Details
                    </label>
                </div>
                <div>
                    <label htmlFor="CurrentYear" className="block text-md font-medium text-gray-900 dark:text-white">
                        Current Year
                    </label>
                </div>
                <div>
                    <label htmlFor="PriorYear" className="block text-md font-medium text-gray-900 dark:text-white">
                        Prior Year
                    </label>
                </div>
            </div>

            {/* Grid layout for Current Year fields */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Exchange Rate */}
                <div>
                    <label htmlFor="currentExchange" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Exchange rate
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="currentExchange"
                        name="inputTreatyDetail.treatyCurrentYear.currentExchange"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.currentExchange}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="priorExchange"
                        name="inputTreatyDetail.treatyPriorYear.priorExchange"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.priorExchange}
                        onChange={handleAmountInput}

                    />
                </div>
            </div>

            {/* Reinsurers' Margin */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="currentMargin" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Reinsurers' Margin
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="currentMargin"
                        name="inputTreatyDetail.treatyCurrentYear.currentMargin"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.currentMargin}
                        onChange={(e) => handlePercentageChange(e, 'currentMargin')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="priorMargin"
                        name="inputTreatyDetail.treatyPriorYear.priorMargin"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.priorMargin}
                        onChange={(e) => handlePercentageChange(e, 'priorMargin')}

                    />
                </div>
            </div>

            {/* Brokerage */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="currentBrokerage" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Brokerage
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="currentBrokerage"
                        name="inputTreatyDetail.treatyCurrentYear.currentBrokerage"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.currentBrokerage}
                        onChange={(e) => handlePercentageChange(e, 'currentBrokerage')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="priorBrokerage"
                        name="inputTreatyDetail.treatyPriorYear.priorBrokerage"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.priorBrokerage}
                        onChange={(e) => handlePercentageChange(e, 'priorBrokerage')}

                    />
                </div>
            </div>

            {/* Interest Rate */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="currentInterest" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Interest Rate
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="currentInterest"
                        name="inputTreatyDetail.treatyCurrentYear.currentInterest"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.currentInterest}
                        onChange={(e) => handlePercentageChange(e, 'currentInterest')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="priorInterest"
                        name="inputTreatyDetail.treatyPriorYear.priorInterest"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.priorInterest}
                        onChange={(e) => handlePercentageChange(e, 'priorInterest')}

                    />
                </div>
            </div>

            {/* LAP */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="currentLAP" className="block text-sm font-medium text-gray-900 dark:text-white">
                        LAP
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="currentLAP"
                        name="inputTreatyDetail.treatyCurrentYear.currentLAP"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.currentLAP}
                        onChange={(e) => handlePercentageChange(e, 'currentLAP')}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="priorLAP"
                        name="inputTreatyDetail.treatyPriorYear.priorLAP"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.priorLAP}
                        onChange={(e) => handlePercentageChange(e, 'priorLAP')}
                    />
                </div>
            </div>

            {/* Maintenance Credit */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="currentMaintenance" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Maintenance Credit
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="currentMaintenance"
                        name="inputTreatyDetail.treatyCurrentYear.currentMaintenance"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.currentMaintenance}
                        onChange={handleAmountInput}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="priorMaintenance"
                        name="inputTreatyDetail.treatyPriorYear.priorMaintenance"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.priorMaintenance}
                        onChange={handleAmountInput}
                    />
                </div>
            </div>
        </div>
    );
}

export default TretyDetail;
