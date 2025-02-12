import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

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