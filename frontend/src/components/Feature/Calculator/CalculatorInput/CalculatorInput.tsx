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
    const [error, setError] = useState<string | null>(null);

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
            throw new Error("Struktur payload tidak valid.");
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setError(null);

            const cleanedValues = Object.keys(values).reduce((acc, key) => {
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
                                : value.toString();
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

            try {
                validatePayloadStructure(payload);
                const response = await axios.post("http://localhost:5000/api/calculators", payload, {
                    headers: { "Content-Type": "application/json" },
                });
                console.log("Data berhasil disimpan:", response.data);
            } catch (err) {
                console.error("Terjadi kesalahan:", err);
                if (axios.isAxiosError(err) && err.response) {
                    setError(err.response.data.message || "Kesalahan terjadi. Mohon cek kembali input Anda.");
                } else {
                    setError("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
                }
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
        } else if (id === "inputOpeningfund") {
            formik.setFieldValue(id, value.toString());
        } else if (id === "inputTreatyYear") {
            formik.setFieldValue(id, parseInt(value));
        } else {
            formik.setFieldValue(id, value);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
                <StatementInput
                    formData={{ ...formik.values, inputTreatyYear: formik.values.inputTreatyYear.toString() }}
                    handleInputChange={handleInputChange}
                />
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

                {error && (
                    <div className="text-red-500 mt-4">
                        {error}
                    </div>
                )}
            </div>
        </form>
    );
}

export default CalculatorInput;
