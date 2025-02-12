import React from "react";
import InputFields from "./InputFields";

interface InputGroupProps {
    label: string;
    inputs: {
        id: string;
        placeholder: string;
        value: number | string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        readonly?: boolean;
    }[];
}

const InputGroup: React.FC<InputGroupProps> = ({ label, inputs }) => {
    return (
        <div className="grid grid-cols-5 gap-4 mb-4">
            <div>
                <label className="block text-md font-medium text-gray-900">{label}</label>
            </div>
            {inputs.map((input) => (
                <div key={input.id}>
                    <InputFields {...input} />
                </div>
            ))}
        </div>
    );
};

export default InputGroup;
