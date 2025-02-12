import React from "react";

const DateInput = ({
    id,
    label,
    inputRef,
    value,
    handleInputChange,
}: {
    id: string;
    label: string;
    inputRef: React.RefObject<HTMLInputElement>;
    value: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => (
    <div className="relative max-w-sm mt-4">
        <label htmlFor={id} className="form-label text-md font-medium text-gray-900 dark:text-white">
            {label}
        </label>
        <input
            type="text"
            id={id}
            ref={inputRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={value}
            onChange={handleInputChange}
            datepicker-format="yyyy-mm-dd"
        />
    </div>
);

export default DateInput;
