// API Service for Polisimuda
// Base URL for API
const API_BASE_URL = 'https://api.polisimuda.com';

// Set to true to use real API, false to use simulation
const USE_REAL_API = false;

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}

export interface PaymentResponse {
    success: boolean;
    redirectUrl?: string;
    orderId?: string;
    snapToken?: string;
    error?: string;
}

// Simulate API delay (only used for simulation mode)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// REGISTER API
// Endpoint: POST https://api.polisimuda.com/register
// Body: { name, email, password }
// ============================================
export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
    if (USE_REAL_API) {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    user: data.user,
                    token: data.token
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Pendaftaran gagal'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Gagal terhubung ke server'
            };
        }
    }

    // SIMULATION MODE
    await delay(1500);
    return {
        success: true,
        user: {
            id: 'user_' + Date.now(),
            name: name,
            email: email
        },
        token: 'mock_token_' + Date.now()
    };
}

// ============================================
// LOGIN API
// Endpoint: POST https://api.polisimuda.com/login
// Body: { email, password }
// ============================================
export async function login(email: string, password: string): Promise<AuthResponse> {
    if (USE_REAL_API) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    user: data.user,
                    token: data.token
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Email atau password salah'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Gagal terhubung ke server'
            };
        }
    }

    // SIMULATION MODE
    await delay(1500);
    return {
        success: true,
        user: {
            id: 'user_' + Date.now(),
            name: email.split('@')[0],
            email: email
        },
        token: 'mock_token_' + Date.now()
    };
}

// ============================================
// CREATE PAYMENT API (Midtrans)
// Endpoint: POST https://api.polisimuda.com/payment/create
// Body: { userId, amount, plan }
// Headers: Authorization Bearer token
// ============================================
export async function createPayment(userId: string, token?: string): Promise<PaymentResponse> {
    if (USE_REAL_API) {
        try {
            const response = await fetch(`${API_BASE_URL}/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({
                    userId,
                    amount: 150000,
                    plan: 'premium_3months'
                })
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    orderId: data.orderId,
                    redirectUrl: data.redirectUrl,
                    snapToken: data.snapToken // For Midtrans Snap
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Gagal membuat pembayaran'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Gagal terhubung ke server pembayaran'
            };
        }
    }

    // SIMULATION MODE
    await delay(1000);
    const orderId = 'ORDER_' + Date.now();
    return {
        success: true,
        orderId: orderId,
        redirectUrl: `https://app.midtrans.com/snap/v4/redirection/${orderId}`,
        snapToken: 'mock_snap_token_' + Date.now()
    };
}

// ============================================
// CHECK PAYMENT STATUS API
// Endpoint: GET https://api.polisimuda.com/payment/status/:orderId
// ============================================
export async function checkPaymentStatus(orderId: string, token?: string): Promise<{ success: boolean; status: string; error?: string }> {
    if (USE_REAL_API) {
        try {
            const response = await fetch(`${API_BASE_URL}/payment/status/${orderId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                }
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    status: data.status // pending, settlement, expire, cancel
                };
            } else {
                return {
                    success: false,
                    status: 'error',
                    error: data.message || 'Gagal mengecek status pembayaran'
                };
            }
        } catch (error) {
            return {
                success: false,
                status: 'error',
                error: 'Gagal terhubung ke server'
            };
        }
    }

    // SIMULATION MODE
    await delay(500);
    return {
        success: true,
        status: 'settlement'
    };
}

// ============================================
// GOOGLE AUTH
// Note: Requires OAuth implementation on backend
// Endpoint: POST https://api.polisimuda.com/auth/google
// ============================================
export async function googleAuth(): Promise<AuthResponse> {
    if (USE_REAL_API) {
        // In production, this would redirect to Google OAuth
        // and handle the callback on the backend
        try {
            // This is a simplified version - real implementation needs OAuth flow
            window.location.href = `${API_BASE_URL}/auth/google`;
            return { success: true }; // Will redirect
        } catch (error) {
            return {
                success: false,
                error: 'Gagal terhubung ke Google'
            };
        }
    }

    // SIMULATION MODE
    await delay(2000);
    return {
        success: true,
        user: {
            id: 'google_user_' + Date.now(),
            name: 'Google User',
            email: 'user@gmail.com'
        },
        token: 'google_mock_token_' + Date.now()
    };
}

// ============================================
// HELPER: Store token to localStorage
// ============================================
export function saveToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('polisimuda_token', token);
    }
}

export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('polisimuda_token');
    }
    return null;
}

export function removeToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('polisimuda_token');
    }
}
