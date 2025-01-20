import React, { useState } from "react";
import InputGroup from "./InputGroup";
import ShareValues from "./ShareValues";

interface ShareDetailProps {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const ShareDetail: React.FC<ShareDetailProps> = ({ handleInputChange }) => {
    const [amounts, setAmounts] = useState(JSON.parse(JSON.stringify(ShareValues)));

    const updateNestedField = (obj: any, path: string[], value: any) => {
        const [key, ...rest] = path;
        if (!rest.length) {
            obj[key] = value;
            return;
        }
        if (!obj[key]) obj[key] = {};
        updateNestedField(obj[key], rest, value);
    };

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = e.target;
        let validValue = value.replace(/[^0-9.]/g, "");

        if (validValue.split(".").length > 2) {
            validValue = validValue.slice(0, validValue.lastIndexOf("."));
        }

        const path = id.split(".");
        const updatedAmounts = { ...amounts };
        updateNestedField(updatedAmounts, path, validValue);
        setAmounts(updatedAmounts);

        handleInputChange({
            target: {
                id,
                value: validValue,
            },
        } as React.ChangeEvent<HTMLInputElement>, id);
    };

    return (
        <div>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-5">Swiss Re's Share</label>

            <InputGroup
                label="MDP - USD"
                inputs={[
                    { id: "inputShare.sharePdma.pdmaShareUsd", name: "MDP USD", placeholder: "Enter amount", value: amounts.inputShare?.sharePdma?.pdmaShareUsd },
                    { id: "inputShare.shareMa.maShareUsd", name: "MA USD", placeholder: "Enter amount", value: amounts.inputShare?.shareMa?.maShareUsd },
                    { id: "inputShare.shareAv.avShareUsd", name: "AV USD", placeholder: "Enter amount", value: amounts.inputShare?.shareAv?.avShareUsd },
                    { id: "inputShare.shareLiability.liabilityShareUsd", name: "Liability USD", placeholder: "Enter amount", value: amounts.inputShare?.shareLiability?.liabilityShareUsd }
                ]}
                handleInputChange={handleAmountInput}
            />

            <InputGroup
                label="MDP - IDR"
                inputs={[
                    { id: "inputShare.sharePdma.pdmaShareIdr", name: "MDP IDR", placeholder: "Enter amount", value: amounts.inputShare?.sharePdma?.pdmaShareIdr },
                    { id: "inputShare.shareMa.maShareIdr", name: "MA IDR", placeholder: "Enter amount", value: amounts.inputShare?.shareMa?.maShareIdr },
                    { id: "inputShare.shareAv.avShareIdr", name: "AV IDR", placeholder: "Enter amount", value: amounts.inputShare?.shareAv?.avShareIdr },
                    { id: "inputShare.shareLiability.liabilityShareIdr", name: "Liability IDR", placeholder: "Enter amount", value: amounts.inputShare?.shareLiability?.liabilityShareIdr }
                ]}
                handleInputChange={handleAmountInput}
            />

            <InputGroup
                label="Adjustment Premium - USD"
                inputs={[
                    { id: "inputShare.sharePdma.pdmaSharePremiumUsd", name: "Adjustment Premium USD", placeholder: "Enter amount", value: amounts.inputShare?.sharePdma?.pdmaSharePremiumUsd },
                    { id: "inputShare.shareMa.maSharePremiumUsd", name: "MA Premium USD", placeholder: "Enter amount", value: amounts.inputShare?.shareMa?.maSharePremiumUsd },
                    { id: "inputShare.shareAv.avSharePremiumUsd", name: "AV Premium USD", placeholder: "Enter amount", value: amounts.inputShare?.shareAv?.avSharePremiumUsd },
                    { id: "inputShare.shareLiability.liabilitySharePremiumUsd", name: "Liability Premium USD", placeholder: "Enter amount", value: amounts.inputShare?.shareLiability?.liabilitySharePremiumUsd }
                ]}
                handleInputChange={handleAmountInput}
            />

            <InputGroup
                label="Adjustment Premium - IDR"
                inputs={[
                    { id: "inputShare.sharePdma.pdmaSharePremiumIdr", name: "Adjustment Premium IDR", placeholder: "Enter amount", value: amounts.inputShare?.sharePdma?.pdmaSharePremiumIdr },
                    { id: "inputShare.shareMa.maSharePremiumIdr", name: "MA Premium IDR", placeholder: "Enter amount", value: amounts.inputShare?.shareMa?.maSharePremiumIdr },
                    { id: "inputShare.shareAv.avSharePremiumIdr", name: "AV Premium IDR", placeholder: "Enter amount", value: amounts.inputShare?.shareAv?.avSharePremiumIdr },
                    { id: "inputShare.shareLiability.liabilitySharePremiumIdr", name: "Liability Premium IDR", placeholder: "Enter amount", value: amounts.inputShare?.shareLiability?.liabilitySharePremiumIdr }
                ]}
                handleInputChange={handleAmountInput}
            />
        </div>
    );
};

export default ShareDetail;
