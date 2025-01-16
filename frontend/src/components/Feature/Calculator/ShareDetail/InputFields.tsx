import React from "react";

interface InputFieldsProps {
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
}

const InputFields: React.FC<InputFieldsProps> = ({ id, name, placeholder, value, onChange, readOnly = false }) => (
    <input
        type="number"
        id={id}
        name={name}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
    />
);

export default InputFields;
