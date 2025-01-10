import React from "react";

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

function PremiumDetail({ formData, handleInputChange }: PremiumDetailProps) {
    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Prior Year Adjustment Premium</label>

            {/* Adjustment Premium - USD */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="pdmaPremiumUsd"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Adjustment Premium - USD
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaPremiumUsd"
                        name="inputPremium.premiumPdma.pdmaPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumPdma.pdmaPremiumUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maPremiumUsd"
                        name="inputPremium.premiumMa.maPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumMa.maPremiumUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avPremiumUsd"
                        name="inputPremium.premiumAv.avPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumAv.avPremiumUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityPremiumUsd"
                        name="inputPremium.premiumLiability.liabilityPremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumLiability.liabilityPremiumUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Adjustment Premium - IDR */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="pdmaPremiumIdr"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Adjustment Premium - IDR
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaPremiumIdr"
                        name="inputPremium.premiumPdma.pdmaPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumPdma.pdmaPremiumIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maPremiumIdr"
                        name="inputPremium.premiumMa.maPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumMa.maPremiumIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avPremiumIdr"
                        name="inputPremium.premiumAv.avPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumAv.avPremiumIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityPremiumIdr"
                        name="inputPremium.premiumLiability.liabilityPremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputPremium.premiumLiability.liabilityPremiumIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Share */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="pdmaPremiumShare"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Share
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaPremiumShare"
                        name="inputPremium.premiumPdma.pdmaPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputPremium.premiumPdma.pdmaPremiumShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maPremiumShare"
                        name="inputPremium.premiumMa.maPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputPremium.premiumMa.maPremiumShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avPremiumShare"
                        name="inputPremium.premiumAv.avPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputPremium.premiumAv.avPremiumShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityPremiumShare"
                        name="inputPremium.premiumLiability.liabilityPremiumShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputPremium.premiumLiability.liabilityPremiumShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default PremiumDetail;
