import React from "react";

interface ShareDetailProps {
    formData: {
        inputShare: {
            sharePdma: {
                pdmaShareUsd: string; // pdmaShareUsd = pdmaDetailUsd * pdmaDetailShare
                pdmaShareIdr: string; //pdmaShareIdr = pdmaDetailIdr * pdmaDetailShare
                pdmaSharePremiumUsd: string; //pdmaSharePremiumUsd = pdmaPremiumUsd * pdmaPremiumShare
                pdmaSharePremiumIdr: string; //pdmaSharePremiumIdr = pdmaPremiumIdr * pdmaPremiumShare
            };
            shareMa: {
                maShareUsd: string; //maShareUsd = maDetailUsd * maDetailShare
                maShareIdr: string; //maShareIdr = maDetailIdr * maDetailShare
                maSharePremiumUsd: string; //maSharePremiumUsd = pdmaPremiumUsd * maPremiumShare
                maSharePremiumIdr: string; //maSharePremiumIdr = pdmaDetailUsd * maPremiumShare
            };
            shareAv: {
                avShareUsd: string; //avShareUsd = avDetailUsd * avDetailShare
                avShareIdr: string; //avShareIdr = avDetailIdr * avDetailShare
                avSharePremiumUsd: string; //avSharePremiumUsd = avPremiumUsd * avPremiumShare
                avSharePremiumIdr: string; //avSharePremiumIdr = avPremiumIdr * avPremiumShare
            };
            shareLiability: {
                liabilityShareUsd: string; //liabilityShareUsd = liabilityDetailUsd * liabilityDetailShare
                liabilityShareIdr: string; //liabilityShareIdr = liabilityDetailIdr * liabilityDetailShare
                liabilitySharePremiumUsd: string; //liabilitySharePremiumUsd = liabilityPremiumUsd * liabilityPremiumShare
                liabilitySharePremiumIdr: string; //liabilitySharePremiumIdr = liabilityPremiumIdr * liabilityPremiumShare
            };
        };
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShareDetail: React.FC<ShareDetailProps> = ({ formData, handleInputChange }: ShareDetailProps) => {
    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Swiss Re's Share</label>

            {/* MDP - USD */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="mdpUsd"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        MDP - USD
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaShareUsd"
                        name="inputShare.sharePdma.pdmaShareUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.sharePdma.pdmaShareUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maShareUsd"
                        name="inputShare.shareMa.maShareUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareMa.maShareUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avShareUsd"
                        name="inputShare.shareAv.avShareUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareAv.avShareUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityShareUsd"
                        name="inputShare.shareLiability.liabilityShareUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareLiability.liabilityShareUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
            </div>

            {/* MDP - IDR */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="mdpIdr"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        MDP - IDR
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaShareIdr"
                        name="inputShare.sharePdma.pdmaShareIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.sharePdma.pdmaShareIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maShareIdr"
                        name="inputShare.shareMa.maShareIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareMa.maShareIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avShareIdr"
                        name="inputShare.shareAv.avShareIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareAv.avShareIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilityShareIdr"
                        name="inputShare.shareLiability.liabilityShareIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareLiability.liabilityShareIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
            </div>

            {/* ADJUSTMENT PREMIUM - USD */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="mdpIdr"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        ADJUSTMENT PREMIUM - USD
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaSharePremiumUsd"
                        name="inputShare.sharePdma.pdmaSharePremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.sharePdma.pdmaSharePremiumUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maSharePremiumIdr"
                        name="inputShare.shareMa.maSharePremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareMa.maSharePremiumUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avSharePremiumUsd"
                        name="inputShare.shareAv.avSharePremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareAv.avSharePremiumUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilitySharePremiumUsd"
                        name="inputShare.shareLiability.liabilitySharePremiumUsd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareLiability.liabilitySharePremiumUsd}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
            </div>

            {/* ADJUSTMENT PREMIUM - IDR */}
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="mdpIdr"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        ADJUSTMENT PREMIUM - IDR
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="pdmaSharePremiumIdr"
                        name="inputShare.sharePdma.pdmaSharePremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.sharePdma.pdmaSharePremiumIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="maSharePremiumIdr"
                        name="inputShare.shareMa.maSharePremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareMa.maSharePremiumIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="avSharePremiumIdr"
                        name="inputShare.shareAv.avSharePremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareAv.avSharePremiumIdr}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        type="number"
                        id="liabilitySharePremiumIdr"
                        name="inputShare.shareLiability.liabilitySharePremiumIdr"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount"
                        value={formData.inputShare.shareLiability.liabilitySharePremiumIdr || ""}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default ShareDetail;
