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
import { convertPremiumShares } from "../PremiumDetail/premiumDetailsData";
import { convertLayerShares } from "../LayerDetail/layerDetailsData";

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

    const convertPercentageToDecimal = (value: string) => {
        if (value.includes("%")) {
            return parseFloat(value.replace("%", "")) / 100;
        }
        return parseFloat(value);
    };

    function validatePayloadStructure(payload: any) {
        if (!payload.inputLayerDetail || !payload.inputPremium || !payload.inputShare) {
            throw new Error("Payload structure is invalid");
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log("Form errors:", formik.errors);
            if (Object.keys(formik.errors).length > 0) {
                console.error("Form has errors, not submitting");
                return;
            }

            console.log("Formik onSubmit triggered");
            setIsLoading(true);

            const cleanedValues = Object.keys(values).reduce((acc: Partial<typeof initialValues>, key) => {
                const value = values[key as keyof typeof initialValues];
                if (value) {
                    if (
                        key.includes("Brokerage") ||
                        key.includes("Interest") ||
                        key.includes("Margin") ||
                        key.includes("LAP") ||
                        key.includes("Share") ||
                        key.includes("PremiumShare")
                    ) {
                        (acc as any)[key] =
                            typeof value === "string"
                                ? convertPercentageToDecimal(value)
                                : value;
                    } else {
                        (acc as any)[key] = value;
                    }
                }
                return acc;
            }, {} as Partial<typeof initialValues>);

            const combinedData = {
                sharePdma: { ...layerResults.sharePdma, ...premiumResults.sharePdma },
                shareMa: { ...layerResults.shareMa, ...premiumResults.shareMa },
                shareAv: { ...layerResults.shareAv, ...premiumResults.shareAv },
                shareLiability: { ...layerResults.shareLiability, ...premiumResults.shareLiability },
            };

            const payload = {
                ...cleanedValues,
                inputLayerDetail: convertLayerShares(layerAmounts),
                inputPremium: convertPremiumShares(premiumAmounts),
                inputShare: combinedData,
            };

            console.log("After Payload:", payload);

            try {
                validatePayloadStructure(payload);
                console.log("Sending payload:", payload);
                const response = await axios.post("http://localhost:5000/api/calculators", payload, {
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
        if (
            id.includes("Margin") ||
            id.includes("Interest") ||
            id.includes("LAP") ||
            id.includes("Brokerage") ||
            id.includes("Share")
        ) {
            formik.setFieldValue(id, convertPercentageToDecimal(value));
        } else {
            formik.setFieldValue(id, value);
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
            formik.handleSubmit(e);
        }}>
            <div className="space-y-6">
                <StatementInput formData={formik.values} handleInputChange={handleInputChange} />
                <br />

                <TreatyDetail formData={formik.values} handleInputChange={handleInputChange} />
                <br />

                <LayerDetail
                    amounts={layerAmounts}
                    handleInputChange={handleLayerInputChange}
                    handlePercentageChange={(e) =>
                        handleLayerPercentageChange(e, e.target.id)
                    }
                    setFieldValue={formik.setFieldValue}
                />
                <br />

                <PremiumDetail
                    amounts={premiumAmounts}
                    handleInputChange={handlePremiumInputChange}
                    handlePercentageChange={(e) =>
                        handlePremiumPercentageChange(e, e.target.id)
                    }
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