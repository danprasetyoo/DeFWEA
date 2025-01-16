import React from "react";

interface InputFieldsProps {
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly?: boolean;
}

const InputFields: React.FC<InputFieldsProps> = ({ id, name, placeholder, value, onChange, readonly }) => {
    return (
        <input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readonly}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
};

export default InputFields;
