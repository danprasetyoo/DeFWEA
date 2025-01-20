import React from "react";
import InputGroup from "./InputGroup";
import { rows, readonlyRows } from "./layerDetailsData";
import { useLayerDetails } from "./useLayerDetails";

type LayerDetailProps = {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFieldValue: (field: string, value: any) => void;
};

const LayerDetail: React.FC<LayerDetailProps> = ({ handleInputChange, setFieldValue }) => {
    const { amounts, results, handleLocalInputChange, handlePercentageChange } = useLayerDetails(handleInputChange, setFieldValue);

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Layer Details</h1>
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

export default LayerDetail;