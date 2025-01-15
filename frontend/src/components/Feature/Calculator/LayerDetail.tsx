import React, { useState } from "react";

interface LayerDetailProps {
    formData: {
        inputLayerDetail: {
            layerPdma: {
                pdmaDetailUsd: string;
                pdmaDetailIdr: string;
                pdmaDetailShare: string;
            };
            layerMa: {
                maDetailUsd: string;
                maDetailIdr: string;
                maDetailShare: string;
            };
            layerAv: {
                avDetailUsd: string;
                avDetailIdr: string;
                avDetailShare: string;
            };
            layerLiability: {
                liabilityDetailUsd: string;
                liabilityDetailIdr: string;
                liabilityDetailShare: string;
            };
        };
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LayerDetail({ handleInputChange }: LayerDetailProps) {
    const [amounts, setAmounts] = useState({
        pdmaDetailUsd: "",
        pdmaDetailIdr: "",
        pdmaDetailShare: "",
        maDetailUsd: "",
        maDetailIdr: "",
        maDetailShare: "",
        avDetailUsd: "",
        avDetailIdr: "",
        avDetailShare: "",
        liabilityDetailUsd: "",
        liabilityDetailIdr: "",
        liabilityDetailShare: ""
    })

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

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAmounts(prevAmounts => {
            const updatedAmounts = {
                ...prevAmounts,
                [id]: value
            };
            // Kirim perubahan ke handleInputChange untuk memperbarui formData
            handleInputChange({
                target: {
                    id,
                    value
                }
            } as React.ChangeEvent<HTMLInputElement>);
            return updatedAmounts;
        });
    };

    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">
                Layer Details
            </label>

            {/* Label */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div></div>
                <div>
                    <label htmlFor="pdmaDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        PDMA Layer 1A
                    </label>
                </div>
                <div>
                    <label htmlFor="maDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Marine & Aviation Layer 1
                    </label>
                </div>
                <div>
                    <label htmlFor="avDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Marine & Aviation Layer 2
                    </label>
                </div>
                <div>
                    <label htmlFor="liabilityDetail" className="block text-md font-medium text-gray-900 dark:text-white">
                        Liability Layer 1
                    </label>
                </div>
            </div>

            {/* MDP-USD */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label htmlFor="detailUsd" className="block text-sm font-medium text-gray-900 dark:text-white">
                        MDP-USD
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="pdmaDetailUsd"
                        name="inputLayerDetail.layerPdma.pdmaDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.pdmaDetailUsd}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="maDetailUsd"
                        name="inputLayerDetail.layerMa.maDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.maDetailUsd}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="avDetailUsd"
                        name="inputLayerDetail.layerAv.avDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.avDetailUsd}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="liabilityDetailUsd"
                        name="inputLayerDetail.layerLiability.liabilityDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.liabilityDetailUsd}
                        onChange={handleAmountInput}

                    />
                </div>
            </div>

            {/* MDP-IDR */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label htmlFor="detailIdr" className="block text-sm font-medium text-gray-900 dark:text-white">
                        MDP-IDR
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="pdmaDetailIdr"
                        name="inputLayerDetail.layerPdma.pdmaDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.pdmaDetailIdr}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="maDetailIdr"
                        name="inputLayerDetail.layerMa.maDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.maDetailIdr}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="avDetailIdr"
                        name="inputLayerDetail.layerAv.avDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.avDetailIdr}
                        onChange={handleAmountInput}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="liabilityDetailIdr"
                        name="inputLayerDetail.layerLiability.liabilityDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={amounts.liabilityDetailIdr}
                        onChange={handleAmountInput}

                    />
                </div>
            </div>

            {/* Share */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label htmlFor="detailShare" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Share
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="pdmaDetailShare"
                        name="inputLayerDetail.layerPdma.pdmaDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.pdmaDetailShare}
                        onChange={(e) => handlePercentageChange(e, 'pdmaDetailShare')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="maDetailShare"
                        name="inputLayerDetail.layerMa.maDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.maDetailShare}
                        onChange={(e) => handlePercentageChange(e, 'maDetailShare')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="avDetailShare"
                        name="inputLayerDetail.layerAv.avDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.avDetailShare}
                        onChange={(e) => handlePercentageChange(e, 'avDetailShare')}

                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="liabilityDetailShare"
                        name="inputLayerDetail.layerLiability.liabilityDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={amounts.liabilityDetailShare}
                        onChange={(e) => handlePercentageChange(e, 'liabilityDetailShare')}

                    />
                </div>
            </div>
        </div>
    );
}

export default LayerDetail;
