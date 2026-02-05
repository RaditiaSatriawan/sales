'use client'

import { useEffect, useState } from 'react'

interface PremiumCheckoutProps {
    snapToken: string;
    onPaymentSuccess: () => void;
    onClose: () => void;
}

declare global {
    interface Window {
        snap: {
            pay: (token: string, options?: {
                onSuccess?: (result: any) => void;
                onPending?: (result: any) => void;
                onError?: (result: any) => void;
                onClose?: () => void;
            }) => void;
        };
    }
}

export default function PremiumCheckout({ snapToken, onPaymentSuccess, onClose }: PremiumCheckoutProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [snapReady, setSnapReady] = useState(false);
    const [hasOpenedPopup, setHasOpenedPopup] = useState(false);

    useEffect(() => {
        const snapSrcUrl = 'https://app.midtrans.com/snap/snap.js';
        const myMidtransClientKey = 'Mid-client-AUpJu60P3WfcNh5Y';

        const existingScript = document.querySelector(`script[src="${snapSrcUrl}"]`);

        if (existingScript) {
            console.log('Snap script already loaded');
            if (window.snap) {
                setSnapReady(true);
                setIsLoading(false);
            } else {
                existingScript.addEventListener('load', () => {
                    console.log('Snap script loaded from existing');
                    setSnapReady(true);
                    setIsLoading(false);
                });
            }
            return;
        }

        console.log('Loading Snap script...');
        const script = document.createElement('script');
        script.src = snapSrcUrl;
        script.setAttribute('data-client-key', myMidtransClientKey);
        script.async = true;

        script.onload = () => {
            console.log('Snap script loaded successfully');
            console.log('window.snap available:', !!window.snap);
            setSnapReady(true);
            setIsLoading(false);
        };

        script.onerror = () => {
            console.error('Failed to load Snap script');
            setError('Gagal memuat script pembayaran');
            setIsLoading(false);
        };

        document.body.appendChild(script);

        // return empty function agar tidak reload saat cleanup
        return () => {}
    }, []);

    useEffect(() => {
        if (snapReady && !hasOpenedPopup) {
            setHasOpenedPopup(true);
            setTimeout(() => {
                openMidtransPopup();
            }, 1000);
        }
    }, [snapReady, hasOpenedPopup]);

    const initializePayment = async () => {
        try {
            if (typeof window !== 'undefined' && window.snap) {
                setIsLoading(false);
                openMidtransPopup();
            } else {
                setError('Midtrans belum siap, mohon refresh halaman');
                setIsLoading(false);
            }
        } catch (err) {
            setError('Gagal memuat pembayaran');
            setIsLoading(false);
        }
    };

    const openMidtransPopup = () => {
        console.log('openMidtransPopup called');
        console.log('snapToken:', snapToken);
        console.log('window.snap exists:', !!window.snap);

        if (typeof window !== 'undefined' && window.snap) {
            console.log('Calling window.snap.pay with token:', snapToken);
            try {
                window.snap.pay(snapToken, {
                    onSuccess: function(result) {
                        console.log('Payment success:', result);
                        onPaymentSuccess();
                    },
                    onPending: function(result) {
                        console.log('Payment pending:', result);
                    },
                    onError: function(result) {
                        console.log('Payment error:', result);
                        setError('Pembayaran gagal, silakan coba lagi');
                    },
                    onClose: function() {
                        console.log('Customer closed the popup without finishing the payment');
                    }
                });
            } catch (err) {
                console.error('Error calling snap.pay:', err);
                setError('Gagal membuka popup pembayaran: ' + err);
            }
        } else {
            console.error('window.snap not available');
            setError('Midtrans Snap belum siap');
        }
    };

    return (
        <div className="checkout-overlay">
            <div className="checkout-container">
                {/* Close button */}
                <button className="checkout-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Cart Icon */}
                <div className="checkout-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>

                {/* Title */}
                <h1 className="checkout-title">Berlangganan Premium</h1>

                {/* Loading state */}
                {isLoading && (
                    <div className="checkout-loading">
                        <div className="checkout-spinner"></div>
                        <p>Memproses pembayaran...</p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="checkout-error">
                        <p>{error}</p>
                        <button onClick={openMidtransPopup}>Buka Pembayaran</button>
                    </div>
                )}

                {/* Payment info */}
                {!isLoading && !error && snapReady && (
                    <div className="checkout-info">
                        <div className="checkout-card">
                            <p className="checkout-info-text">
                                Popup pembayaran Midtrans telah dibuka. Jika tidak muncul, klik tombol di bawah:
                            </p>
                            <button
                                className="checkout-link"
                                onClick={openMidtransPopup}
                                style={{
                                    background: '#2563eb',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                                Buka Pembayaran Midtrans
                            </button>
                        </div>

                        {/* Price summary */}
                        <div className="checkout-summary">
                            <div className="checkout-item">
                                <span>Premium 3 Bulan</span>
                                <span>Rp150.000</span>
                            </div>
                            <div className="checkout-total">
                                <span>Total</span>
                                <span>Rp150.000</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
