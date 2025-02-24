import React, { useState } from "react";
import { useFormik } from "formik";
import StatementInput from "../StatementInput/StatementInput";
import TreatyDetail from "../TreatyDetail/TreatyDetail";
import LayerDetail from "../LayerDetail/LayerDetail";
import PremiumDetail from "../PremiumDetail/PremiumDetail";
import axios from "axios";
import { validationSchema } from "../../../../validation/validationSchema";
import { useLayerDetails } from "../LayerDetail/useLayerDetails";
import { usePremiumDetails } from "../PremiumDetail/usePremiumDetails";
import initialValues from "./InitialValues";
import { convertPremiumShares } from "../PremiumDetail/premiumDetailsData";
import { convertLayerShares } from "../LayerDetail/layerDetailsData";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://192.168.1.87:5000/api';

interface CalculatorPayload {
    inputStatementDate: string;
    inputOpeningfund: string;
    inputStatementPeriod: string;
    inputTreatyYear: number;
    inputTreatyDetail?: object | null;
    inputLayerDetail?: object;
    inputPremium?: object;
    inputShare?: object;
}

function CalculatorInput() {
    const [isLoading, setIsLoading] = useState(false);
    const [networkError, setNetworkError] = useState<string | null>(null);

    const sanitizeNumber = (value: any): number => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };

    const formatDate = (dateString: string): string => {
        try {
            return dateString.split('T')[0];
        } catch {
            return new Date().toISOString().split('T')[0];
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
        validate: (values) => {
            try {
                validationSchema.validateSync(values, { abortEarly: false });
            } catch (errors) {
                const validationErrors = errors as any;
                console.log('Validation errors:', validationErrors.inner);
                return validationErrors.inner.reduce((acc: any, error: any) => {
                    acc[error.path] = error.message;
                    return acc;
                }, {});
            }
        },
        onSubmit: async (values) => {
            console.log("onSubmit function triggered");
            setIsLoading(true);
            setNetworkError(null);

            try {
                console.log("Cleaning values...");
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
                        } else if (key.includes("Date") || key.includes("Period")) {
                            const dateValue = value as string;
                            const parts = dateValue.split('-');
                            if (parts.length === 3) {
                                (acc as any)[key] = `${parts[0]}-${parts[1]}-${parts[2]}`;
                            } else {
                                (acc as any)[key] = formatDate(value as string);
                            }
                        } else if (key.includes("Detail")) {
                            (acc as any)[key] = typeof value === 'object' ? value : {};
                        } else {
                            (acc as any)[key] = value;
                        }
                    }
                    return acc;
                }, {} as Partial<typeof initialValues>);


                console.log("Combining data...");
                const combinedData = {
                    sharePdma: { ...layerResults.sharePdma, ...premiumResults.sharePdma },
                    shareMa: { ...layerResults.shareMa, ...premiumResults.shareMa },
                    shareAv: { ...layerResults.shareAv, ...premiumResults.shareAv },
                    shareLiability: { ...layerResults.shareLiability, ...premiumResults.shareLiability },
                };

                const payload: CalculatorPayload = {
                    inputStatementDate: cleanedValues.inputStatementDate as string,
                    inputOpeningfund: cleanedValues.inputOpeningfund as string,
                    inputStatementPeriod: cleanedValues.inputStatementPeriod as string,
                    inputTreatyYear: sanitizeNumber(cleanedValues.inputTreatyYear),
                    inputTreatyDetail: cleanedValues.inputTreatyDetail,
                    inputLayerDetail: convertLayerShares(layerAmounts),
                    inputPremium: convertPremiumShares(premiumAmounts),
                    inputShare: combinedData,
                };

                console.log('Submitting payload:', payload);

                const headers = {
                    'Content-Type': 'application/json'
                };

                console.log('Making network request to:', `${API_BASE}/calculators`);

                const response = await axios.post(`${API_BASE}/calculators`, payload, { headers });

                console.log('Network request completed');

                if (response.status === 201) {
                    console.log('Data saved successfully:', response.data);
                    formik.resetForm();
                } else if (response.data?.details) {
                    console.log('Handling response errors');
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
                console.log("Setting isLoading to false");
                setIsLoading(false);
            }
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        let formattedValue = value;
        if (id === "inputStatementDate" || id === "inputStatementPeriod") {
            const inputDate = value;
            formattedValue = inputDate;
        }
        formik.setFieldValue(id, formattedValue);
    };


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
        }}>
            <div className="space-y-6">

                {networkError && (
                    <div className="text-red-500">{networkError}</div>
                )}

                <StatementInput
                    formData={{
                        inputStatementDate: formik.values.inputStatementDate || '',
                        inputOpeningfund: formik.values.inputOpeningfund || '',
                        inputStatementPeriod: formik.values.inputStatementPeriod || '',
                        inputTreatyYear: formik.values.inputTreatyYear || 0,
                    }}
                    handleInputChange={handleInputChange}
                    handleBlur={formik.handleBlur}
                />
                <br />

                <TreatyDetail
                    formData={formik.values}
                    handleInputChange={handleInputChange}
                    formikError={formik.errors}
                    formikTouched={formik.touched}
                />
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