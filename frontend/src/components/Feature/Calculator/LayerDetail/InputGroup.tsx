import React from "react";
import InputField from "./InputFields";

interface InputGroupProps {
    label: string;
    inputs: {
        id: string;
        name: string;
        placeholder: string;
        value: string;
        type?: "text" | "percentage";
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }[];
}

const InputGroup: React.FC<InputGroupProps> = ({ label, inputs }) => {
    return (
        <div className="grid grid-cols-5 gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            </div>
            {inputs.map((input) => (
                <div key={input.id}>
                    <InputField
                        id={input.id}
                        name={input.name}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={input.onChange}
                    />
                </div>
            ))}
        </div>
    );
};

export default InputGroup;
