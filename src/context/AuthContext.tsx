import { createContext, useContext, useState, ReactNode } from 'react';
import { apiUrl, fetchApi } from '../api/client';

export type UserRole = 'USER' | 'ADMIN';

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    organization?: string;
    country?: string;
    paymentStatus?: 'PENDING' | 'COMPLETED';
    registrationPackage?: string;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: any) => Promise<void>;
    register: (profileData: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('user_profile');
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (credentials: any) => {
        const response = await fetch(apiUrl('/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email.trim(),
                password: credentials.password,
            }),
        });

        if (!response.ok) {
            const errBody = await response.json();
            const msg = errBody.detail
                ? (typeof errBody.detail === 'string' ? errBody.detail : errBody.detail[0]?.msg || 'Login failed')
                : 'Login failed';
            throw new Error(msg);
        }

        const data = await response.json();
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_profile', JSON.stringify(data.user));
        setUser(data.user);
    };

    const register = async (profileData: any) => {
        const data = await fetchApi<any>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(profileData)
        });
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_profile', JSON.stringify(data.user));
        setUser(data.user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_profile');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
