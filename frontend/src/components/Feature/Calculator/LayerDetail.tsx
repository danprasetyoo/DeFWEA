import React from "react";

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

function LayerDetail({ formData, handleInputChange }: LayerDetailProps) {
    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">
                Prior Year Treaty Detail
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
                        type="number"
                        id="pdmaDetailUsd"
                        name="inputLayerDetail.layerPdma.pdmaDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerPdma.pdmaDetailUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maDetailUsd"
                        name="inputLayerDetail.layerMa.maDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerMa.maDetailUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avDetailUsd"
                        name="inputLayerDetail.layerAv.avDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerAv.avDetailUsd}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityDetailUsd"
                        name="inputLayerDetail.layerLiability.liabilityDetailUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerLiability.liabilityDetailUsd}
                        onChange={handleInputChange}
                        required
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
                        type="number"
                        id="pdmaDetailIdr"
                        name="inputLayerDetail.layerPdma.pdmaDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerPdma.pdmaDetailIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maDetailIdr"
                        name="inputLayerDetail.layerMa.maDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerMa.maDetailIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avDetailIdr"
                        name="inputLayerDetail.layerAv.avDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerAv.avDetailIdr}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityDetailIdr"
                        name="inputLayerDetail.layerLiability.liabilityDetailIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputLayerDetail.layerLiability.liabilityDetailIdr}
                        onChange={handleInputChange}
                        required
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
                        type="number"
                        id="pdmaDetailShare"
                        name="inputLayerDetail.layerPdma.pdmaDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputLayerDetail.layerPdma.pdmaDetailShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maDetailShare"
                        name="inputLayerDetail.layerMa.maDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputLayerDetail.layerMa.maDetailShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avDetailShare"
                        name="inputLayerDetail.layerAv.avDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputLayerDetail.layerAv.avDetailShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityDetailShare"
                        name="inputLayerDetail.layerLiability.liabilityDetailShare"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Percentage"
                        value={formData.inputLayerDetail.layerLiability.liabilityDetailShare}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default LayerDetail;
