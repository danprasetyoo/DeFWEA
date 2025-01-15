import { useFormik } from "formik";
import StatementInput from "./StatementInput";
import TreatyDetail from "./TreatyDetail/TreatyDetail";
import LayerDetail from "./LayerDetail/LayerDetail";
import PremiumDetail from "./PremiumDetail";
import ShareDetail from "./ShareDetail";
import axios from "axios";
import { validationSchema } from "../../../validation/validationSchema";
import { useState } from "react";

// Interface Definitions for nested fields (these should match the actual values expected in ShareDetail, etc.)
interface TreatyDetail {
    treatyCurrentYear: {
        currentExchange: string;
        currentMargin: string;
        currentBrokerage: string;
        currentInterest: string;
        currentLAP: string;
        currentMaintenance: string;
    };
    treatyPriorYear: {
        priorExchange: string;
        priorMargin: string;
        priorBrokerage: string;
        priorInterest: string;
        priorLAP: string;
        priorMaintenance: string;
    };
}

interface LayerDetail {
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
}

interface PremiumDetail {
    premiumPdma: {
        pdmaPremiumUsd: string;
        pdmaPremiumIdr: string;
        pdmaPremiumShare: string;
    };
    premiumMa: {
        maPremiumUsd: string;
        maPremiumIdr: string;
        maPremiumShare: string;
    };
    premiumAv: {
        avPremiumUsd: string;
        avPremiumIdr: string;
        avPremiumShare: string;
    };
    premiumLiability: {
        liabilityPremiumUsd: string;
        liabilityPremiumIdr: string;
        liabilityPremiumShare: string;
    };
}

interface ShareDetail {
    sharePdma: {
        pdmaShareUsd: string;
        pdmaShareIdr: string;
        pdmaSharePremiumUsd: string;
        pdmaSharePremiumIdr: string;
    };
    shareMa: {
        maShareUsd: string;
        maShareIdr: string;
        maSharePremiumUsd: string;
        maSharePremiumIdr: string;
    };
    shareAv: {
        avShareUsd: string;
        avShareIdr: string;
        avSharePremiumUsd: string;
        avSharePremiumIdr: string;
    };
    shareLiability: {
        liabilityShareUsd: string;
        liabilityShareIdr: string;
        liabilitySharePremiumUsd: string;
        liabilitySharePremiumIdr: string;
    };
}

function CalculatorInput() {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            inputStatementDate: "",
            inputOpeningfund: "",
            inputStatementPeriod: "",
            inputTreatyYear: "",
            inputTreatyDetail: {
                treatyCurrentYear: {
                    currentExchange: "",
                    currentMargin: "",
                    currentBrokerage: "",
                    currentInterest: "",
                    currentLAP: "",
                    currentMaintenance: "",
                },
                treatyPriorYear: {
                    priorExchange: "",
                    priorMargin: "",
                    priorBrokerage: "",
                    priorInterest: "",
                    priorLAP: "",
                    priorMaintenance: "",
                },
            },
            inputLayerDetail: {
                layerPdma: {
                    pdmaDetailUsd: "",
                    pdmaDetailIdr: "",
                    pdmaDetailShare: "",
                },
                layerMa: {
                    maDetailUsd: "",
                    maDetailIdr: "",
                    maDetailShare: "",
                },
                layerAv: {
                    avDetailUsd: "",
                    avDetailIdr: "",
                    avDetailShare: "",
                },
                layerLiability: {
                    liabilityDetailUsd: "",
                    liabilityDetailIdr: "",
                    liabilityDetailShare: "",
                },
            },
            inputPremium: {
                premiumPdma: {
                    pdmaPremiumUsd: "",
                    pdmaPremiumIdr: "",
                    pdmaPremiumShare: "",
                },
                premiumMa: {
                    maPremiumUsd: "",
                    maPremiumIdr: "",
                    maPremiumShare: "",
                },
                premiumAv: {
                    avPremiumUsd: "",
                    avPremiumIdr: "",
                    avPremiumShare: "",
                },
                premiumLiability: {
                    liabilityPremiumUsd: "",
                    liabilityPremiumIdr: "",
                    liabilityPremiumShare: "",
                },
            },
            inputShare: {
                sharePdma: {
                    pdmaShareUsd: "",
                    pdmaShareIdr: "",
                    pdmaSharePremiumUsd: "",
                    pdmaSharePremiumIdr: "",
                },
                shareMa: {
                    maShareUsd: "",
                    maShareIdr: "",
                    maSharePremiumUsd: "",
                    maSharePremiumIdr: "",
                },
                shareAv: {
                    avShareUsd: "",
                    avShareIdr: "",
                    avSharePremiumUsd: "",
                    avSharePremiumIdr: "",
                },
                shareLiability: {
                    liabilityShareUsd: "",
                    liabilityShareIdr: "",
                    liabilitySharePremiumUsd: "",
                    liabilitySharePremiumIdr: "",
                },
            },
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            try {
                const response = await axios.post("/api/calculators", values);
                console.log("Data berhasil disimpan:", response.data);
            } catch (error) {
                console.error("Ada kesalahan saat menyimpan data:", error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    const convertToPercentage = (value: string): number => (value ? parseFloat(value) / 100 : 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        // Ensure you only convert fields that require percentage conversion
        if (
            id.includes("Margin") ||
            id.includes("Interest") ||
            id.includes("LAP") ||
            id.includes("Maintenance") ||
            id.includes("Share")
        ) {
            formik.setFieldValue(id, convertToPercentage(value));
        } else {
            formik.setFieldValue(id, value);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
                <StatementInput formData={formik.values} handleInputChange={handleInputChange} />
                <br />
                <TreatyDetail formData={formik.values} handleInputChange={handleInputChange} />
                <br />
                <LayerDetail formData={formik.values} handleInputChange={handleInputChange} />
                <br />
                <PremiumDetail formData={formik.values} handleInputChange={handleInputChange} />
                <br />
                <ShareDetail formData={formik.values} handleInputChange={handleInputChange} />

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
