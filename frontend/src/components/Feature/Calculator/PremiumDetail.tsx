import React, { useState } from "react";

interface PremiumDetailProps {
    formData: {
        inputPremium: {
            premiumPdma: {
                pdmaPremiumUsd: string;
                pdmaPremiumIdr: string;
                pdmaPremiumShare: string;
            };
            premiumMa: {
                maPremiumUsd: string;
                maPremiumIdr: string;
                maPremiumShare: string;
            };
            premiumAv: {
                avPremiumUsd: string;
                avPremiumIdr: string;
                avPremiumShare: string;
            };
            premiumLiability: {
                liabilityPremiumUsd: string;
                liabilityPremiumIdr: string;
                liabilityPremiumShare: string;
            };
        }
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PremiumDetail({ handleInputChange }: PremiumDetailProps) {
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
        liabilityPremiumShare: ""
    });

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
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Prior Year Adjustment Premium</label>

            {/* Adjustment Premium - USD */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="adjustmentPremiumUsd"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Adjustment Premium - USD
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="pdmaPremiumUsd"
                        name="inputPremium.premiumPdma.pdmaPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.pdmaPremiumUsd}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="maPremiumUsd"
                        name="inputPremium.premiumMa.maPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.maPremiumUsd}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="avPremiumUsd"
                        name="inputPremium.premiumAv.avPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.avPremiumUsd}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="liabilityPremiumUsd"
                        name="inputPremium.premiumLiability.liabilityPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.liabilityPremiumUsd}
                        onChange={handleAmountInput}

                    />
                </div>
            </div>

            {/* Adjustment Premium - IDR */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="adjusmentPremiumIdr"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Adjustment Premium - IDR
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="pdmaPremiumIdr"
                        name="inputPremium.premiumPdma.pdmaPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.pdmaPremiumIdr}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="maPremiumIdr"
                        name="inputPremium.premiumMa.maPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.maPremiumIdr}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="avPremiumIdr"
                        name="inputPremium.premiumAv.avPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.avPremiumIdr}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="liabilityPremiumIdr"
                        name="inputPremium.premiumLiability.liabilityPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.liabilityPremiumIdr}
                        onChange={handleAmountInput}

                    />
                </div>
            </div>

            {/* Share */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="sharePremium"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Share
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="pdmaPremiumShare"
                        name="inputPremium.premiumPdma.pdmaPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.pdmaPremiumShare}
                        onChange={(e) => handlePercentageChange(e, 'pdmaPremiumShare')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="maPremiumShare"
                        name="inputPremium.premiumMa.maPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.maPremiumShare}
                        onChange={(e) => handlePercentageChange(e, 'maPremiumShare')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="avPremiumShare"
                        name="inputPremium.premiumAv.avPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.avPremiumShare}
                        onChange={(e) => handlePercentageChange(e, 'avPremiumShare')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="liabilityPremiumShare"
                        name="inputPremium.premiumLiability.liabilityPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.liabilityPremiumShare}
                        onChange={(e) => handlePercentageChange(e, 'liabilityPremiumShare')}

                    />
                </div>
            </div>
        </div>
    );
}

export default PremiumDetail;
