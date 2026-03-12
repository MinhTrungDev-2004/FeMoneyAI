import api from "./api";

/**
 * Generic result wrapper from the backend.
 */
export interface ApiResult<T> {
    data: T;
    message: string;
    result: boolean;
}

export interface CreateCategoryRequest {
    name: string;
    type: "THU" | "CHI";
    icon: string;
    colorCode: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
    type: "THU" | "CHI";
    icon: string;
    colorCode: string;
}

/**
 * Service to handle category-related API calls.
 */
export const categoryService = {
    /**
     * API tạo mới một danh mục (Category).
     */
    create: async (data: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await api.post<ApiResult<CategoryResponse>>("categories/create", data);
        return response.data.data;
    },

    /**
     * API lấy danh sách tất cả danh mục (Category) của người dùng hiện tại.
     */
    getAll: async (): Promise<CategoryResponse[]> => {
        const response = await api.get<ApiResult<List<CategoryResponse>>>("public/categories/gets-all");
        // Note: Spring boot List becomes a JS array
        return response.data.data;
    },

    /**
     * API cập nhật thông tin một danh mục (Category) theo ID.
     */
    update: async (id: number, data: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await api.put<ApiResult<CategoryResponse>>(`categories/update/${id}`, data);
        return response.data.data;
    },

    /**
     * API xóa một danh mục (Category) theo ID.
     */
    delete: async (id: number): Promise<void> => {
        await api.delete<ApiResult<void>>(`categories/delete/${id}`);
    },
};

// Helper for type safety in getAll
type List<T> = T[];



