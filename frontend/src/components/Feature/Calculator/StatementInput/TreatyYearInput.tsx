import React from "react";

const TreatyYearInput = ({ value, handleInputChange, handleBlur }: { value: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void }) => (
    <div className="relative max-w-sm mt-4">
        <div>
            <label htmlFor="inputTreatyYear" className="block text-md font-medium text-gray-900 dark:text-white">
                Treaty Year
            </label>
        </div>
        <input
            type="number"
            id="inputTreatyYear"
            name="inputTreatyYear"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter year"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            maxLength={4}
        />
    </div>
);

export default TreatyYearInput;
