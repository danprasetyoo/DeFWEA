import React from "react";
import InputGroup from "./InputGroup";
import { rows, readonlyRows, initialAmounts } from "./premiumDetailsData";
import { usePremiumDetails } from "./usePremiumDetails";

type PremiumDetailProps = {
    amounts: typeof initialAmounts;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePercentageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Pastikan properti ini ada
    setFieldValue: (field: string, value: any) => void;
};

const PremiumDetail: React.FC<PremiumDetailProps> = ({ handleInputChange, setFieldValue }) => {
    const { amounts, results, handleLocalInputChange, handlePercentageChange } = usePremiumDetails(setFieldValue, handleInputChange);

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Premium Details</h1>
            {rows(amounts, handlePercentageChange, handleLocalInputChange).map((row) => (
                <InputGroup key={row.label} label={row.label} inputs={row.inputs} />
            ))}
            <h1 className="text-lg font-bold mb-4">Swiss Re Share</h1>
            {readonlyRows(results).map((row) => (
                <InputGroup key={row.label} label={row.label} inputs={row.inputs} />
            ))}
        </div>
    );
};

export default PremiumDetail;
