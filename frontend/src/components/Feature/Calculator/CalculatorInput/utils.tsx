export interface ApiError {
    error: {
        message: string;
        code?: string;
        details?: Array<{ path: string[]; message: string }>;
    };
}

export interface CalculatorPayload {
    inputStatementDate: string;
    inputOpeningfund: string;
    inputStatementPeriod: string;
    inputTreatyYear: number;
    inputTreatyDetail?: object;
    inputLayerDetail?: object;
    inputPremium?: object;
    inputShare?: object;
}

export const sanitizeNumber = (value: any): number => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
    return date.toISOString().split('T')[0];
};

export const convertPercentageToDecimal = (value: string | number | undefined) => {
    if (value === undefined || value === null) return 0;

    if (typeof value === 'string' && value.includes("%")) {
        const num = parseFloat(value.replace("%", ""));
        return isNaN(num) ? 0 : num / 100;
    }
    return Number(value);
};