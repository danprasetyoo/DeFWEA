import React, { useEffect } from "react";

interface ShareCalculationProps {
    formData: {
        inputShare: {
            sharePdma: {
                pdmaDetailUsd: string;
                pdmaShareUsd: string;
            };
        };
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShareCalculation: React.FC<ShareCalculationProps> = ({ formData, handleInputChange }) => {
    useEffect(() => {
        // Calculate pdmaShareUsd whenever pdmaDetailUsd or pdmaShareUsd changes
        const pdmaDetailUsd = parseFloat(formData.inputShare.sharePdma.pdmaDetailUsd || '0');
        const pdmaShareUsd = parseFloat(formData.inputShare.sharePdma.pdmaShareUsd || '0');

        // Perform the calculation if both values are numbers
        if (!isNaN(pdmaDetailUsd) && !isNaN(pdmaShareUsd)) {
            const calculatedPdmaShareUsd = pdmaDetailUsd * pdmaShareUsd;

            // Update the pdmaShareUsd field with the calculated value
            handleInputChange({
                target: {
                    name: 'inputShare.sharePdma.pdmaShareUsd',
                    value: calculatedPdmaShareUsd.toString()
                }
            } as React.ChangeEvent<HTMLInputElement>);
        }
    }, [formData.inputShare.sharePdma.pdmaDetailUsd, formData.inputShare.sharePdma.pdmaShareUsd, handleInputChange]);

    return <></>;
};

export default ShareCalculation;
