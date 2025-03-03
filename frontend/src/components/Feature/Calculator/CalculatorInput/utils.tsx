import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || '';

export const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.message === "Network Error") {
                return Promise.reject({
                    response: {
                        status: 0,
                        data: { error: { message: "Network Error. Please check CORS settings" } }
                    }
                });
            }
            return Promise.reject(error);
        }
    );
};

interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export const fetchCalculators = async (pagination: Pagination, setPagination: (pagination: Pagination) => void) => {
    try {
        const response = await axios.get(`${API_BASE}/calculators`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
            },
        });

        setPagination({
            ...pagination,
            total: Number(response.headers['x-total-count']) || 0,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching calculators:', error);
        return [];
    }
};

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
    const [day, month, year] = dateString.split('/');
    if (day && month && year) {
        return `${year}-${month}-${day}`;
    }
    return new Date().toISOString().split('T')[0];
};

export const convertPercentageToDecimal = (value: string | number | undefined) => {
    if (value === undefined || value === null) return 0;

    if (typeof value === 'string' && value.includes("%")) {
        const num = parseFloat(value.replace("%", ""));
        return isNaN(num) ? 0 : num / 100;
    }
    return Number(value);
};