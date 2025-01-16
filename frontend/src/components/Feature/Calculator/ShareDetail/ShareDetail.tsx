import React from "react";
import InputGroup from "./InputGroup";

interface ShareDetailProps {
    formData: {
        inputShare: {
            sharePdma: { [key: string]: string };
            shareMa: { [key: string]: string };
            shareAv: { [key: string]: string };
            shareLiability: { [key: string]: string };
        };
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShareDetail: React.FC<ShareDetailProps> = ({ formData, handleInputChange }) => {
    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Swiss Re's Share</label>

            <InputGroup
                label="MDP - USD"
                inputs={[
                    { id: "pdmaShareUsd", name: "inputShare.sharePdma.pdmaShareUsd", placeholder: "Amount", value: formData.inputShare.sharePdma.pdmaShareUsd },
                    { id: "maShareUsd", name: "inputShare.shareMa.maShareUsd", placeholder: "Amount", value: formData.inputShare.shareMa.maShareUsd },
                    { id: "avShareUsd", name: "inputShare.shareAv.avShareUsd", placeholder: "Amount", value: formData.inputShare.shareAv.avShareUsd },
                    { id: "liabilityShareUsd", name: "inputShare.shareLiability.liabilityShareUsd", placeholder: "Amount", value: formData.inputShare.shareLiability.liabilityShareUsd },
                ]}
                handleInputChange={handleInputChange}
            />

            <InputGroup
                label="MDP - IDR"
                inputs={[
                    { id: "pdmaShareIdr", name: "inputShare.sharePdma.pdmaShareIdr", placeholder: "Amount", value: formData.inputShare.sharePdma.pdmaShareIdr },
                    { id: "maShareIdr", name: "inputShare.shareMa.maShareIdr", placeholder: "Amount", value: formData.inputShare.shareMa.maShareIdr },
                    { id: "avShareIdr", name: "inputShare.shareAv.avShareIdr", placeholder: "Amount", value: formData.inputShare.shareAv.avShareIdr },
                    { id: "liabilityShareIdr", name: "inputShare.shareLiability.liabilityShareIdr", placeholder: "Amount", value: formData.inputShare.shareLiability.liabilityShareIdr },
                ]}
                handleInputChange={handleInputChange}
            />

            <InputGroup
                label="Adjusment Premium - USD"
                inputs={[
                    { id: "pdmaSharePremiumUsd", name: "inputShare.sharePdma.pdmaSharePremiumUsd", placeholder: "Amount", value: formData.inputShare.sharePdma.pdmaSharePremiumUsd },
                    { id: "maSharePremiumUsd", name: "inputShare.shareMa.maSharePremiumUsd", placeholder: "Amount", value: formData.inputShare.shareMa.maSharePremiumUsd },
                    { id: "avSharePremiumUsd", name: "inputShare.shareAv.avSharePremiumUsd", placeholder: "Amount", value: formData.inputShare.shareAv.avSharePremiumUsd },
                    { id: "liabilitySharePremiumUsd", name: "inputShare.shareLiability.liabilitySharePremiumUsd", placeholder: "Amount", value: formData.inputShare.shareLiability.liabilitySharePremiumUsd },
                ]}
                handleInputChange={handleInputChange}
            />

            <InputGroup
                label="Adjustmen Premium - IDR"
                inputs={[
                    { id: "pdmaSharePremiumIdr", name: "inputShare.sharePdma.pdmaSharePremiumIdr", placeholder: "Amout", value: formData.inputShare.sharePdma.pdmaSharePremiumIdr },
                    { id: "maSharePremiumIdr", name: "inputShare.shareMa.maSharePremiumIdr", placeholder: "Amount", value: formData.inputShare.shareMa.maSharePremiumIdr },
                    { id: "avSharePremiumIdr", name: "inputShare.shareAv.avSharePremiumIdr", placeholder: "Amount", value: formData.inputShare.shareAv.avSharePremiumIdr },
                    { id: "liabilitySharePremiumIdr", name: "inputShare.shareLiability.liabilitySharePremiumIdr", placeholder: "Amount", value: formData.inputShare.shareLiability.liabilitySharePremiumIdr },
                ]}
                handleInputChange={handleInputChange}
            />
        </div>
    );
};

export default ShareDetail;
