import api from "./api";

export interface ApiResult<T> {
    status: boolean;
    userMessage: string;
    internalMessage?: string;
    traceID?: string;
    data: T;
}

export interface CreateCategoryRequest {
    name: string;
    type: "EXPENSE" | "INCOME";
    icon: string;
    colorCode: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
    type: "EXPENSE" | "INCOME";
    icon: string;
    colorCode: string;
}

export const categoryService = {
    create: async (data: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await api.post<ApiResult<CategoryResponse>>("/categories/create", data);
        return response.data.data;
    },

    /**
     * API lấy danh sách tất cả danh mục (Category) của người dùng hiện tại.
     */
    getAll: async (): Promise<CategoryResponse[]> => {
        const response = await api.get<ApiResult<List<CategoryResponse>>>("/categories/gets-all");
        console.log("API getAll response:", response.data);
        return response.data?.data || [];
    },

    /**
     * API cập nhật thông tin một danh mục (Category) theo ID.
     */
    update: async (id: number, data: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await api.put<ApiResult<CategoryResponse>>(`/categories/update/${id}`, data);
        return response.data.data;
    },

    /**
     * API xóa một danh mục (Category) theo ID.
     */
    delete: async (id: number): Promise<void> => {
        await api.delete<ApiResult<void>>(`/categories/delete/${id}`);
    },
};

type List<T> = T[];



