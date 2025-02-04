import React from "react";
import InputField from "./InputFields";

interface InputGroupProps {
    label: string;
    fields: {
        currentLabel: string;
        priorLabel: string;
        currentId: string;
        priorId: string;
        type: "text" | "percentage";
    }[];
    amounts: Record<string, any>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, fields, amounts, handleChange }) => {
    return (
        <div className="mb-4">
            <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{label}</h1>
            </div>
            {fields.map(({ currentLabel, currentId, priorId, type }) => (
                <div key={currentId} className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <label
                            htmlFor={currentId}
                            className="block text-md font-medium text-gray-900 dark:text-white"
                        >
                            {currentLabel}
                        </label>
                    </div>
                    <div>
                        <InputField
                            id={currentId}
                            value={amounts[currentId]}
                            type={type}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputField
                            id={priorId}
                            value={amounts[priorId]}
                            type={type}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InputGroup;