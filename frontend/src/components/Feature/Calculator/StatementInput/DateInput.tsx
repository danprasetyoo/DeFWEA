import React from "react";

const DateInput = ({ id, label, ref, value, handleInputChange }: { id: string, label: string, ref: React.RefObject<HTMLInputElement>, value: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="relative max-w-sm mt-4">
        <div>
            <label htmlFor={id} className="form-label text-md font-medium text-gray-900 dark:text-white">
                {label}
            </label>
        </div>
        <div className="relative">
            <input
                type="text"
                id={id}
                ref={ref}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                placeholder="Select date"
                onChange={handleInputChange}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </div>
        </div>
    </div>
);

export default DateInput;
