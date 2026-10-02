// src/api/client.ts

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://vmi2848672.contaboserver.net/aeaa/api').replace(/\/+$/, '');

export function apiUrl(endpoint: string): string {
    return `${API_BASE_URL}/${endpoint.replace(/^\/+/, '')}`;
}

function getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = apiUrl(endpoint);
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
    };

    // If body is FormData (for file uploads) or URLSearchParams, drop the Content-Type header so browser applies it automatically
    if (options.body instanceof FormData || options.body instanceof URLSearchParams) {
        delete (defaultHeaders as any)['Content-Type'];
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        let errorMsg = 'An error occurred';
        try {
            const errBody = await response.json();
            console.error('API Error Response:', JSON.stringify(errBody, null, 2)); // Debug hook
            // Try to extract FastAPI validation error or detail response
            if (errBody.detail) {
                if (typeof errBody.detail === 'string') {
                    errorMsg = errBody.detail;
                } else if (Array.isArray(errBody.detail) && errBody.detail.length > 0) {
                    errorMsg = errBody.detail[0].msg;
                }
            } else if (errBody.message) {
                errorMsg = errBody.message;
            }
        } catch (e) {
            errorMsg = response.statusText || 'Server Error';
        }
        throw new Error(errorMsg);
    }

    if (response.status === 204) {
        return null as unknown as T; // No content
    }

    return await response.json();
}
