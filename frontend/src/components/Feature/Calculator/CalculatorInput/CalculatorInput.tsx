import { useFormik } from "formik";
import StatementInput from "../StatementInput";
import TreatyDetail from "../TreatyDetail/TreatyDetail";
import LayerDetail from "../LayerDetail/LayerDetail";
import PremiumDetail from "../PremiumDetail/PremiumDetail";
import axios from "axios";
import { validationSchema } from "../../../../validation/validationSchema";
import { useState } from "react";
import { useLayerDetails } from "../LayerDetail/useLayerDetails";
import { usePremiumDetails } from "../PremiumDetail/usePremiumDetails";
import initialValues from "./InitialValues";

function CalculatorInput() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        amounts: layerAmounts,
        results: layerResults,
        handleLocalInputChange: handleLayerInputChange,
        handlePercentageChange: handleLayerPercentageChange,
    } = useLayerDetails(() => { }, () => { });

    const {
        amounts: premiumAmounts,
        results: premiumResults,
        handleLocalInputChange: handlePremiumInputChange,
        handlePercentageChange: handlePremiumPercentageChange,
    } = usePremiumDetails(() => { }, () => { });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            const combinedData = {
                sharePdma: { ...layerResults.sharePdma, ...premiumResults.sharePdma },
                shareMa: { ...layerResults.shareMa, ...premiumResults.shareMa },
                shareAv: { ...layerResults.shareAv, ...premiumResults.shareAv },
                shareLiability: { ...layerResults.shareLiability, ...premiumResults.shareLiability },
            };

            const cleaneValues = {
                ...values,
                inputShare: combinedData,
            };

            try {
                const response = await axios.post("/api/calculators/post", cleaneValues, {
                    headers: { "Content-Type": "application/json" },
                });
                console.log("Data saved successfully:", response.data);
            } catch (error) {
                console.error("Error saving data:", error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        formik.setFieldValue(id, value);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
                <StatementInput formData={formik.values} handleInputChange={handleInputChange} />
                <br />

                <TreatyDetail formData={formik.values} handleInputChange={handleInputChange} />
                <br />

                <LayerDetail
                    amounts={layerAmounts}
                    handleInputChange={handleLayerInputChange}
                    handlePercentageChange={(e) => handleLayerPercentageChange(e, e.target.id)}
                    setFieldValue={formik.setFieldValue}
                />
                <br />

                <PremiumDetail
                    amounts={premiumAmounts}
                    handleInputChange={handlePremiumInputChange}
                    handlePercentageChange={(e) => handlePremiumPercentageChange(e, e.target.id)}
                    setFieldValue={formik.setFieldValue}
                />

                <div className="flex justify-end py-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-48 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CalculatorInput;
