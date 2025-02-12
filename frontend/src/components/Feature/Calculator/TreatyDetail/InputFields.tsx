import React from "react";

interface InputFieldProps {
    id: string;
    value: number;
    type: "text" | "percentage";
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, value, type, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (type === "text") {
            e.target.value = inputValue.replace(/[^0-9.]/g, "");
        } else if (type === "percentage") {
            let numericValue = inputValue.replace("%", "");
            if (/^\d*\.?\d+$/.test(numericValue)) {
                e.target.value = numericValue + "%";
            } else {
                e.target.value = inputValue.slice(0, inputValue.length - 1);
            }
        }
        onChange(e, id);
    };

    return (
        <input
            type="text"
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={type === "percentage" ? "Percentage" : "Amount"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
};

export default InputField;