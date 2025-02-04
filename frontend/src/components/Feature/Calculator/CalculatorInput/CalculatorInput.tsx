import { useFormik } from "formik";
import StatementInput from "../StatementInput/StatementInput";
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

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

interface CalculatorPayload {
    inputStatementDate: string;
    inputOpeningfund: string;
    inputStatementPeriod: string;
    inputTreatyYear: number;
    inputTreatyDetail?: object;
    inputLayerDetail?: object;
    inputPremium?: object;
    inputShare?: object;
}

function CalculatorInput() {
    const [isLoading, setIsLoading] = useState(false);
    const [networkError, setNetworkError] = useState<string | null>(null); // State untuk network error

    const sanitizeNumber = (value: any): number => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };

    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toISOString();
        } catch {
            return new Date().toISOString();
        }
    };

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

    const convertPercentageToDecimal = (value: string | number | undefined) => {
        if (value === undefined || value === null) return 0;

        if (typeof value === 'string' && value.includes("%")) {
            const num = parseFloat(value.replace("%", ""));
            return isNaN(num) ? 0 : num / 100;
        }
        return Number(value);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setNetworkError(null); // Reset network error saat submit baru

            try {
                const cleanedValues = Object.keys(values).reduce((acc: Partial<typeof initialValues>, key) => {
                    const value = values[key as keyof typeof initialValues];
                    if (value !== undefined && value !== null && value !== "") {
                        if (
                            key.includes("Brokerage") ||
                            key.includes("Interest") ||
                            key.includes("Margin") ||
                            key.includes("LAP") ||
                            key.includes("Share") ||
                            key.includes("PremiumShare")
                        ) {
                            if (typeof value === 'string' || typeof value === 'number' || value === undefined) {
                                (acc as any)[key] = convertPercentageToDecimal(value);
                            }
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

                const payload: CalculatorPayload = {
                    inputStatementDate: formatDate(cleanedValues.inputStatementDate as string),
                    inputOpeningfund: cleanedValues.inputOpeningfund as string,
                    inputStatementPeriod: formatDate(cleanedValues.inputStatementPeriod as string),
                    inputTreatyYear: sanitizeNumber(cleanedValues.inputTreatyYear),
                    inputTreatyDetail: cleanedValues.inputTreatyDetail,
                    inputLayerDetail: convertLayerShares(layerAmounts),
                    inputPremium: convertPremiumShares(premiumAmounts),
                    inputShare: combinedData,
                };

                console.log('Submitting payload:', payload);

                const token = localStorage.getItem('token');
                if (!token) {
                    setNetworkError("Please login first");
                    setIsLoading(false);
                    return;
                }
                const response = await axios.post(`${API_BASE}/calculators`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : undefined
                    },
                    validateStatus: (status) => status < 500
                });

                if (response.status === 201) {
                    console.log('Data saved successfully:', response.data);
                    formik.resetForm();
                    // Handle success (redirect/show notification)
                } else if (response.data?.details) {
                    const errors: Record<string, string> = {};
                    response.data.details.forEach((err: { path: string[]; message: string }) => {
                        const path = err.path.join('.');
                        errors[path] = err.message;
                    });
                    formik.setErrors(errors);
                } else {
                    console.error('Unexpected response:', response);
                }

            } catch (error) {
                console.error('Error during submission:', error);

                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('Server responded with:', error.response.data);
                        if (error.response.status === 400) {
                            const serverSideErrors = error.response.data?.details || {};
                            formik.setErrors(serverSideErrors);
                        }
                    } else if (error.request) {
                        console.error('No response received:', error.request);
                        setNetworkError("Network Error. Please check your internet connection.");
                    } else {
                        console.error('Request setup error:', error.message);
                    }
                }
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
        <form onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
            formik.handleSubmit(e);
        }}>
            <div className="space-y-6">

                {networkError && (
                    <div className="text-red-500">{networkError}</div>
                )}

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