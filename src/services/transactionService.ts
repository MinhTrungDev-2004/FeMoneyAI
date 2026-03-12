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

/**
 * Service to handle transaction-related API calls.
 */
export const transactionService = {
  /**
   * API tạo mới một giao dịch (Transaction).
   */
  create: async (data: CreateTransactionRequest): Promise<TransactionResponse> => {
    const response = await api.post<ApiResult<TransactionResponse>>("transactions/create", data);
    return response.data.data;
  },
};
