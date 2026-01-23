'use client'

import { useEffect, useState } from 'react'

interface PaymentSuccessProps {
    redirectUrl?: string;
}

export default function PaymentSuccess({ redirectUrl = 'https://polisimuda.com/home' }: PaymentSuccessProps) {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Redirect to dashboard
                    window.location.href = redirectUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [redirectUrl]);

    const handleManualRedirect = () => {
        window.location.href = redirectUrl;
    };

    return (
        <div className="success-overlay">
            <div className="success-container">
                {/* Success Icon with Animation */}
                <div className="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#10b981" className="success-circle" />
                        <path
                            d="M8 12l3 3 5-6"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="success-check"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="success-title">Pembayaran Berhasil!</h1>

                {/* Subtitle */}
                <p className="success-subtitle">
                    Selamat! Anda sekarang memiliki akses Premium selama 3 bulan.
                </p>

                {/* Countdown */}
                <div className="success-countdown">
                    <p>Mengalihkan ke dashboard dalam</p>
                    <span className="success-timer">{countdown}</span>
                    <p>detik</p>
                </div>

                {/* Manual redirect button */}
                <button
                    className="success-button"
                    onClick={handleManualRedirect}
                >
                    Masuk ke Dashboard Sekarang
                </button>

                {/* Additional info */}
                <div className="success-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>Email konfirmasi telah dikirim ke alamat email Anda</span>
                </div>
            </div>
        </div>
    );
}
