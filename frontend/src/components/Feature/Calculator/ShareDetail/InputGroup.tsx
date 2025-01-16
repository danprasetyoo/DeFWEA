import React from "react";
import InputField from "./InputFields";

interface InputGroupProps {
    label: string;
    inputs: {
        id: string;
        name: string;
        placeholder: string;
        value: string;
    }[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, inputs, handleInputChange }) => (
    <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
            <label className="block text-md font-medium text-gray-900 dark:text-white">{label}</label>
        </div>
        {inputs.map((input, index) => (
            <div key={index}>
                <InputField
                    id={input.id}
                    name={input.name}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>
        ))}
    </div>
);

export default InputGroup;
