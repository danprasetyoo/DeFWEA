import React from "react";

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

function TretyDetail({ formData, handleInputChange }: TretyDetailProps) {
    return (
        <div>
            {/* Grid layout for Label */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="TreatyDetail"
                        className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                        Treaty Details
                    </label>
                </div>
                <div>
                    <label
                        htmlFor="CurrentYear"
                        className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                        Current Year
                    </label>
                </div>
                <div>
                    <label
                        htmlFor="PriorYear"
                        className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                        Prior Year
                    </label>
                </div>
            </div>

            {/* Grid layout for Current Year fields */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Exchange Rate */}
                <div>
                    <label
                        htmlFor="currentExchange"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Exchange rate
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="currentExchange"
                        name="inputTreatyDetail.treatyCurrentYear.currentExchange"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputTreatyDetail.treatyCurrentYear.currentExchange}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="priorExchange"
                        name="inputTreatyDetail.treatyPriorYear.priorExchange"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputTreatyDetail.treatyPriorYear.priorExchange}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Reinsurers' Margin */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="currentMargin"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Reinsurers' Margin
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="currentMargin"
                        name="inputTreatyDetail.treatyCurrentYear.currentMargin"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyCurrentYear.currentMargin}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="priorMargin"
                        name="inputTreatyDetail.treatyPriorYear.priorMargin"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyPriorYear.priorMargin}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Brokerage */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="currentBrokerage"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Brokerage
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="currentBrokerage"
                        name="inputTreatyDetail.treatyCurrentYear.currentBrokerage"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyCurrentYear.currentBrokerage}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="priorBrokerage"
                        name="inputTreatyDetail.treatyPriorYear.priorBrokerage"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyPriorYear.priorBrokerage}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Interest Rate */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="currentInterest"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Interest Rate
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="currentInterest"
                        name="inputTreatyDetail.treatyCurrentYear.currentInterest"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyCurrentYear.currentInterest}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="priorInterest"
                        name="inputTreatyDetail.treatyPriorYear.priorInterest"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyPriorYear.priorInterest}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* LAP */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="currentLAP"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        LAP
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="currentLAP"
                        name="inputTreatyDetail.treatyCurrentYear.currentLAP"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyCurrentYear.currentLAP}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="priorLAP"
                        name="inputTreatyDetail.treatyPriorYear.priorLAP"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyPriorYear.priorLAP}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Maintenance Credit */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="currentMaintenance"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Maintenance Credit
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="currentMaintenance"
                        name="inputTreatyDetail.treatyCurrentYear.currentMaintenance"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyCurrentYear.currentMaintenance}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="priorMaintenance"
                        name="inputTreatyDetail.treatyPriorYear.priorMaintenance"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputTreatyDetail.treatyPriorYear.priorMaintenance}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default TretyDetail;
