import React from "react";

interface InputFieldsProps {
    id: string;
    placeholder: string;
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly?: boolean;
}

const InputFields: React.FC<InputFieldsProps> = ({ id, placeholder, value, onChange, readonly }) => {
    return (
        <input
            type="text"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readonly}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 w-full ${readonly ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
        />
    );
};

export default InputFields;
