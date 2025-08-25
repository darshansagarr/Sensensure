import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define types for our API responses
interface AuthResponse {
    user: User;
    token: string;
}

interface User {
    id: string;
    email: string;
    device_id: string;
}

interface ResetResponse {
    resetToken: string;
    message: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, device_id: string) => Promise<void>;
    logout: () => void;
    requestPasswordReset: (email: string) => Promise<string>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) return null;
        try {
            return JSON.parse(savedUser);
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Base URL without /api since your backend routes are /auth/register, /auth/login
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

    const login = async (email: string, password: string) => {
        try {
            console.log('Login request:', {
                url: `${API_BASE_URL}/auth/login`,
                email,
                password: '******'
            });
            
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {
                email,
                password
            });

            console.log('Login response:', {
                status: response.status,
                data: response.data
            });

            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error: any) {
            console.error('Login error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                fullError: error
            });
            throw error;
        }
    };

    const register = async (email: string, password: string, device_id: string) => {
        try {
            console.log('Registration request:', {
                url: `${API_BASE_URL}/auth/register`,
                email,
                device_id
            });
            
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, { 
                email, 
                password,
                deviceId: device_id // map device_id param to deviceId key
            });

            console.log('Registration successful:', response.data);

            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error: any) {
            console.error('Registration error details:', {
                endpoint: `${API_BASE_URL}/auth/register`,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message,
                code: error.code
            });
            
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Unable to connect to server. Please check if the backend is running.');
            }
            
            throw error.response?.data?.error || error.message || 'Registration failed';
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    const requestPasswordReset = async (email: string) => {
        try {
            const response = await axios.post<ResetResponse>(`${API_BASE_URL}/auth/request-reset`, { email });
            return response.data.resetToken;
        } catch (error) {
            throw error;
        }
    };

    const resetPassword = async (token: string, newPassword: string) => {
        try {
            await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword });
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, requestPasswordReset, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};