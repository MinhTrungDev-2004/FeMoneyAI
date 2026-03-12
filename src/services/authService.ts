import api from "./api";

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface RegisterRequest {
    email: string;
    password?: string;
}

export interface AuthResponse {
    accessToken?: string;
    access_token?: string;
    token?: string;
    role?: string;
    data?: {
        accessToken?: string;
        token?: string;
        role?: string;
        user?: {
            role?: string;
        };
    };
    user?: {
        role?: string;
    };
}

/**
 * Helper to extract role from auth response or token.
 */
export const extractRole = (data: AuthResponse, token?: string): string | undefined => {
    let role =
        data?.role || data?.data?.role || data?.user?.role || data?.data?.user?.role;

    if (token && !role) {
        try {
            const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(
                decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                        .join(""),
                ),
            );
            role = payload?.role || payload?.roles || payload?.Role || payload?.authorities;
            if (Array.isArray(role)) {
                role = role.find((r) => r.toLowerCase().includes("admin")) || role[0];
            }
        } catch (err) {
            console.error("Failed to decode token for role:", err);
        }
    }
    return role;
};

/**
 * Authentication Service
 */
export const authService = {
    /**
     * Log in a user.
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>("/public/auth/login", credentials);
        return data;
    },

    /**
     * Register a new user.
     */
    register: async (details: RegisterRequest): Promise<void> => {
        await api.post("/public/auth/register", details);
    },

    /**
     * Request a password reset.
     */
    forgotPassword: async (email: string): Promise<void> => {
        await api.post("/public/auth/forgot-password", { email });
    },

    /**
     * Log out the current user.
     */
    logout: async (): Promise<void> => {
        try {
            await api.delete("/public/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    },
};

export const logout = authService.logout;
