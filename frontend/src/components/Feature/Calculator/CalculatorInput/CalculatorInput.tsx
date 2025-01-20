import { useFormik } from "formik";
import StatementInput from "../StatementInput";
import TreatyDetail from "../TreatyDetail/TreatyDetail";
import LayerDetail from "../LayerDetail/LayerDetail";
import PremiumDetail from "../PremiumDetail/PremiumDetail";
import axios from "axios";
import { validationSchema } from "../../../../validation/validationSchema";
import { useState } from "react";
import initialValues from "./InitialValues";

function CalculatorInput() {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: typeof initialValues) => {
            setIsLoading(true);

            const convertPercentageToDecimal = (value: string) => {
                if (value.includes("%")) {
                    return parseFloat(value.replace("%", "")) / 100;
                }
                return parseFloat(value);
            };

            const cleanedValues = Object.keys(values).reduce((acc, key) => {
                const value = values[key as keyof typeof initialValues];

                if (value) {
                    if (
                        key.includes("Brokerage") ||
                        key.includes("Interest") ||
                        key.includes("Margin") ||
                        key.includes("LAP")
                    ) {
                        if (typeof value === "string") {
                            (acc as any)[key] = convertPercentageToDecimal(value);
                        } else {
                            (acc as any)[key] = value;
                        }
                    } else {
                        (acc as any)[key] = value;
                    }
                }
                return acc;
            }, {} as Partial<typeof initialValues>);

            try {
                const response = await axios.post("/api/calculators/post", cleanedValues);
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

        if (
            id.includes("Margin") ||
            id.includes("Interest") ||
            id.includes("LAP") ||
            id.includes("Brokerage") ||
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
