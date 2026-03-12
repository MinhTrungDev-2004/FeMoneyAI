import api from "./api";
import type { ApiResult } from "./categoryService";

export interface CreateTransactionRequest {
    categoryId: number;
    amount: number;
    transactionDate: string;
    note: string;
}

export interface TransactionResponse {
    id: number;
    categoryId: number;
    amount: number;
    transactionDate: string;
    note: string;
}

export const transactionService = {
    create: async (data: CreateTransactionRequest): Promise<TransactionResponse> => {
        const response = await api.post<ApiResult<TransactionResponse>>("/transactions/create", data);
        return response.data.data;
    },
};
