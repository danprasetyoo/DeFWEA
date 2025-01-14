import React, { useState } from "react";
import StatementInput from "./StatementInput";
import TretyDetail from "./TreatyDetail";
import LayerDetail from "./LayerDetail";
import PremiumDetail from "./PremiumDetail";
import ShareDetail from "./ShareDetail";
import axios from "axios";

// Interface Definitions
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

interface FormData {
    inputStatementDate: string;
    inputOpeningfund: string;
    inputStatementPeriod: string;
    inputTreatyYear: string;
    inputTreatyDetail: TreatyDetail;
    inputLayerDetail: LayerDetail;
    inputPremium: PremiumDetail;
    inputShare: ShareDetail;
}

function CalculatorInput() {
    const [formData, setFormData] = useState<FormData>({
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
    });

    const [isLoading, setIsLoading] = useState(false);

    // Handle input change for nested objects
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (!id) {
            console.error('Input id is missing:', e.target);
            return;
        }

        setFormData((prevData) => {
            const keys = id.split('.');
            const updatedData = { ...prevData };

            let ref: any = updatedData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!ref[keys[i]]) {
                    ref[keys[i]] = {};
                }
                ref = ref[keys[i]];
            }

            ref[keys[keys.length - 1]] = value;
            return updatedData;
        });
    };



    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation to ensure required fields are filled
        if (!formData.inputStatementDate || !formData.inputOpeningfund) {
            alert("Please fill all required fields.");
            return;
        }

        setIsLoading(true);  // Set loading to true

        try {
            const response = await axios.post("https://fwea/saveData", formData);
            console.log("Data berhasil disimpan:", response.data);
        } catch (error) {
            console.error("Ada kesalahan saat menyimpan data:", error);
        } finally {
            setIsLoading(false);  // Set loading to false
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <StatementInput formData={formData} handleInputChange={handleInputChange} />
                <br />
                <TretyDetail formData={formData} handleInputChange={handleInputChange} />
                <br />
                <LayerDetail formData={formData} handleInputChange={handleInputChange} />
                <br />
                <PremiumDetail formData={formData} handleInputChange={handleInputChange} />
                <br />
                <ShareDetail formData={formData} handleInputChange={handleInputChange} />

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
