'use client'

import { useState } from 'react'
import { register, login, getInvoiceToken, AuthResponse } from '../services/api'

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (response: AuthResponse) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !password) {
            setError('Email dan password harus diisi');
            return;
        }

        if (!isLogin) {
            if (!name) {
                setError('Nama tampilan harus diisi');
                return;
            }
            if (password !== confirmPassword) {
                setError('Password dan konfirmasi password tidak sama');
                return;
            }
            if (password.length < 6) {
                setError('Password minimal 6 karakter');
                return;
            }
        }

        setIsLoading(true);

        try {
            let response: AuthResponse;

            if (isLogin) {
                response = await login(email, password);

                if (response.success) {
                    const invoiceResponse = await getInvoiceToken();

                    if (invoiceResponse.success && invoiceResponse.token) {
                        console.log(invoiceResponse.token)
                        resetForm();
                        onSuccess({
                            ...response,
                            snapToken: invoiceResponse.token
                        });
                    } else {
                        setError(invoiceResponse.error || 'Gagal mendapatkan token pembayaran');
                    }
                } else {
                    setError(response.error || 'Terjadi kesalahan, coba lagi');
                }
            } else {
                response = await register(name, email, password);

                if (response.success) {
                    const loginResponse = await login(email, password);

                    if (loginResponse.success) {
                        const invoiceResponse = await getInvoiceToken();

                        if (invoiceResponse.success && invoiceResponse.token) {
                            console.log(invoiceResponse.token)
                            resetForm();
                            onSuccess({
                                ...loginResponse,
                                snapToken: invoiceResponse.token
                            });
                        } else {
                            setError(invoiceResponse.error || 'Gagal mendapatkan token pembayaran');
                        }
                    } else {
                        setError(loginResponse.error || 'Login otomatis gagal, silakan login manual');
                    }
                } else {
                    setError(response.error || 'Terjadi kesalahan, coba lagi');
                }
            }
        } catch (err) {
            setError('Gagal terhubung ke server');
        } finally {
            setIsLoading(false);
        }
    };

    // const handleGoogleAuth = async () => {
    //     setIsLoading(true);
    //     setError('');

    //     try {
    //         const response = await googleAuth();
    //         if (response.success) {
    //             onSuccess(response);
    //         } else {
    //             setError(response.error || 'Gagal login dengan Google');
    //         }
    //     } catch (err) {
    //         setError('Gagal terhubung ke Google');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#1f2937" />
                        </svg>
                    </div>
                    <div className="auth-logo-text">
                        <span className="auth-logo-polisi">polisi</span>
                        <span className="auth-logo-muda">MUDA</span>
                    </div>
                </div>
                <div className="auth-tagline">E D U C A T I O N</div>

                {/* Subtitle */}
                <p className="auth-subtitle">
                    {isLogin
                        ? 'Masuk ke akun anda untuk melanjutkan'
                        : 'Buat akun baru untuk melanjutkan'
                    }
                </p>

                {/* Error message */}
                {error && (
                    <div className="auth-error">{error}</div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="auth-field">
                            <label htmlFor="name">Nama Tampilan</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nama Anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="contoh@polisimuda.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">
                            Password
                            {isLogin && (
                                <a href="#" className="auth-forgot">Lupa password?</a>
                            )}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {!isLogin && (
                        <div className="auth-field">
                            <label htmlFor="confirmPassword">Konfirmasi Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Memproses...' : (isLogin ? 'Masuk' : 'Daftar')}
                    </button>
                </form>

                {/* Divider */}
                {/* <div className="auth-divider">
                    <span>ATAU LANJUT DENGAN</span>
                </div> */}

                {/* Google Auth */}
                {/* <button
                    className="auth-google"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {isLogin ? 'Masuk dengan Google' : 'Daftar dengan Google'}
                </button> */}

                {/* Switch mode */}
                <p className="auth-switch">
                    {isLogin ? (
                        <>Belum punya akun? <button onClick={switchMode}>Daftar</button></>
                    ) : (
                        <>Sudah punya akun? <button onClick={switchMode}>Masuk</button></>
                    )}
                </p>
            </div>
        </div>
    );
}
