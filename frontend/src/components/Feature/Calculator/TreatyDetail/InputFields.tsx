const InputField: React.FC<{ id: string, value: string, type: "text" | "percentage", onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void }> = ({ id, value, type, onChange }) => {
    return (
        <input
            type={type === "percentage" ? "text" : "text"}
            id={id}
            value={value}
            onChange={(e) => onChange(e, id)}
            placeholder={type === "percentage" ? "Percentage" : "Amount"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
};

export default InputField;