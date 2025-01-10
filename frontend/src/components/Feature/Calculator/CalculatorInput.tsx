import React, { useState } from "react";
import StatementInput from "./StatementInput";
import TretyDetail from "./TreatyDetail";
import LayerDetail from "./LayerDetail";
import PremiumDetail from "./PremiumDetail";
import ShareDetail from "./ShareDetail";
import axios from "axios";

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const keys = name.split('.');
            const updatedData = { ...prevData };

            let ref: any = updatedData;
            for (let i = 0; i < keys.length - 1; i++) {
                ref = ref[keys[i]];
            }

            ref[keys[keys.length - 1]] = value;
            return updatedData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formData);

        try {
            const response = await axios.post("https://your-api-endpoint.com/saveData", formData);
            console.log("Data berhasil disimpan:", response.data);
        } catch (error) {
            console.error("Ada kesalahan saat menyimpan data:", error);
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
                        className="w-48 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CalculatorInput;
