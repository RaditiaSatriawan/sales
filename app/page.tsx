'use client'

import { useEffect, useState, useRef } from 'react'
import AuthModal from './components/AuthModal'
import PremiumCheckout from './components/PremiumCheckout'
import PaymentSuccess from './components/PaymentSuccess'
import { AuthResponse } from './services/api'

// Flow states
type FlowState = 'idle' | 'auth' | 'checkout' | 'success'

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [flowState, setFlowState] = useState<FlowState>('idle')
    const [snapToken, setSnapToken] = useState<string>('')

    // Placeholder URLs - ganti dengan URL asli
    const WHATSAPP_URL = "https://wa.me/6285128012705?text=Halo%20Polisimuda%2C%20saya%20tertarik%20untuk%20berlangganan"
    const DASHBOARD_URL = "https://polisimuda.com/home"

    // Track Lead event for WhatsApp clicks
    const handleWhatsAppClick = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
                content_name: 'WhatsApp Contact',
                content_category: 'Lead Generation'
            });
        }
    }

    // Handle auth success - move to checkout
    const handleAuthSuccess = (response: AuthResponse) => {
        if (response.snapToken) {
            setSnapToken(response.snapToken)
            setFlowState('checkout')
        }
    }

    // Handle payment success - show success screen
    const handlePaymentSuccess = () => {
        setFlowState('success')
    }

    // Handle close modal
    const handleCloseModal = () => {
        setFlowState('idle')
        setSnapToken('')
    }

    // Open auth modal + track AddToCart
    const handleBelajarSekarang = (e: React.MouseEvent) => {
        e.preventDefault()
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'AddToCart', {
                content_name: 'Paket Premium 3 Bulan',
                content_type: 'product',
                value: 150000,
                currency: 'IDR'
            });
        }
        setFlowState('auth')
    }

    // Track ViewContent on page load
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'ViewContent', {
                content_name: 'Landing Page - Polisimuda',
                content_category: 'Sales Page',
                content_type: 'product',
                value: 150000,
                currency: 'IDR'
            });
        }
    }, [])

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Scroll reveal animation
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active')
                }
            })
        }, observerOptions)

        const revealElements = document.querySelectorAll('.reveal')
        revealElements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <>
            {/* ============ HERO SECTION ============ */}
            <section className="hero" aria-labelledby="hero-title">
                {/* Decorative background elements */}
                <div className="hero-decoration hero-decoration-1"></div>
                <div className="hero-decoration hero-decoration-2"></div>
                <div className="hero-gradient-bg"></div>

                <div className="container">
                    <div className="hero-wrapper">
                        {/* Left Side - Content */}
                        <div className="hero-content">
                            {/* Logo */}
                            <img
                                src="/logo.png"
                                alt="Polisimuda - Platform Tryout Polisi Online Terbaik"
                                className="hero-logo"
                            />

                            <div className="hero-badge">
                                <span className="hero-badge-icon" aria-hidden="true">★</span>
                                Platform Tryout #1 untuk Calon Polisi
                            </div>

                            <h1 id="hero-title">
                                Lulus Tes Polisi dengan <span>Tryout Realtime</span> dan Pembahasan Lengkap
                            </h1>

                            <p className="hero-subtitle">
                                Persiapkan dirimu dengan soal-soal yang SESUAI dengan tes asli, ditambah video dan PDF pembahasan yang mudah dipahami.
                            </p>

                            <div className="hero-price">
                                <p className="hero-price-label">Investasi Masa Depanmu</p>
                                <div className="price-display">
                                    <span className="price-original">Rp500.000</span>
                                    <span className="price-discount">Rp150.000<span className="hero-price-period"> / 3 bulan</span></span>
                                </div>
                                <span className="hero-price-savings">Hemat Rp350.000 (70%)</span>
                            </div>

                            <div className="hero-buttons">
                                <button onClick={handleBelajarSekarang} className="btn btn-primary btn-lg" aria-label="Mulai belajar tryout polisi sekarang">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                                    Belajar Sekarang
                                </button>
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="btn btn-whatsapp btn-lg" aria-label="Hubungi kami via WhatsApp">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Tanya via WhatsApp
                                </a>
                            </div>

                            <div className="hero-features">
                                <div className="hero-feature">
                                    <span className="hero-feature-icon" aria-hidden="true">✓</span>
                                    Akses penuh 3 bulan
                                </div>
                                <div className="hero-feature">
                                    <span className="hero-feature-icon" aria-hidden="true">✓</span>
                                    Update soal rutin
                                </div>
                                <div className="hero-feature">
                                    <span className="hero-feature-icon" aria-hidden="true">✓</span>
                                    Support 24/7
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Graduate Photos */}
                        <div className="hero-graduates" aria-label="Lulusan Polisimuda yang berhasil">
                            <div className="hero-graduate hero-graduate-1">
                                <img
                                    src="/brimob1.jpg"
                                    alt="Lulusan Brimob dari Polisimuda - Alumni yang Berhasil Lulus Tes Polisi"
                                    className="hero-graduate-image"
                                    loading="lazy"
                                />
                                <div className="hero-graduate-label">
                                    <span className="hero-graduate-badge" aria-hidden="true">✓</span>
                                    <span className="hero-graduate-role">LULUS</span>
                                </div>
                            </div>

                            <div className="hero-graduate hero-graduate-2">
                                <img
                                    src="/brimob2.jpg"
                                    alt="Lulusan Polri dari Polisimuda - Sukses Tes Bintara"
                                    className="hero-graduate-image"
                                    loading="lazy"
                                />
                                <div className="hero-graduate-label">
                                    <span className="hero-graduate-badge" aria-hidden="true">✓</span>
                                    <span className="hero-graduate-role">LULUS</span>
                                </div>
                            </div>

                            <div className="hero-graduate hero-graduate-3">
                                <img
                                    src="/brimob3.jpg"
                                    alt="Alumni Polisimuda Lulus Tes Polisi - Bukti Nyata Keberhasilan"
                                    className="hero-graduate-image"
                                    loading="lazy"
                                />
                                <div className="hero-graduate-label">
                                    <span className="hero-graduate-badge" aria-hidden="true">✓</span>
                                    <span className="hero-graduate-role">LULUS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ PROBLEM SECTION ============ */}
            <section className="problem" aria-labelledby="problem-title">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Masalah yang Sering Dihadapi</span>
                        <h2 id="problem-title" className="section-title">Apakah Kamu Mengalami Ini?</h2>
                        <p className="section-subtitle">
                            Banyak calon polisi gagal bukan karena tidak mampu, tapi karena salah strategi persiapan.
                        </p>
                    </div>

                    <div className="problem-cards">
                        <article className="problem-card reveal reveal-delay-1">
                            <div className="problem-icon" aria-hidden="true">?</div>
                            <div className="problem-content">
                                <h3>Bingung Mulai dari Mana</h3>
                                <p>Materi terlalu banyak, tidak tahu harus fokus ke bagian mana dulu untuk mendapatkan hasil maksimal.</p>
                            </div>
                        </article>

                        <article className="problem-card reveal reveal-delay-2">
                            <div className="problem-icon" aria-hidden="true">✕</div>
                            <div className="problem-content">
                                <h3>Soal Latihan Tidak Sesuai</h3>
                                <p>Belajar dari soal yang ternyata beda jauh dengan tes asli, jadi tidak terbiasa dengan pola soalnya.</p>
                            </div>
                        </article>

                        <article className="problem-card reveal reveal-delay-3">
                            <div className="problem-icon" aria-hidden="true">⏱</div>
                            <div className="problem-content">
                                <h3>Tidak Terbiasa dengan Waktu</h3>
                                <p>Saat tes, panik karena tidak terlatih mengerjakan soal dengan batas waktu yang ketat.</p>
                            </div>
                        </article>

                        <article className="problem-card reveal reveal-delay-4">
                            <div className="problem-icon" aria-hidden="true">!</div>
                            <div className="problem-content">
                                <h3>Salah Tapi Tidak Tahu Alasannya</h3>
                                <p>Hanya tahu jawaban benar, tapi tidak paham konsep di baliknya. Kesalahan yang sama terus terulang.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* ============ SOLUTION SECTION ============ */}
            <section className="solution" aria-labelledby="solution-title">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Solusi dari Polisimuda</span>
                        <h2 id="solution-title" className="section-title">Kenapa Ribuan Orang Memilih Kami?</h2>
                        <p className="section-subtitle">
                            3 keunggulan utama yang membuat platform kami berbeda dan sudah terbukti membantu banyak peserta lulus.
                        </p>
                    </div>

                    <div className="solution-cards">
                        <article className="solution-card reveal reveal-delay-1">
                            <div className="solution-icon" aria-hidden="true">⚡</div>
                            <h3>Tryout Realtime</h3>
                            <p>
                                Simulasi tes seperti aslinya! Timer berjalan, soal acak, dan langsung lihat skor setelah selesai. Latih mental dan kecepatanmu setiap hari.
                            </p>
                            <span className="solution-badge">Fitur Unggulan</span>
                        </article>

                        <article className="solution-card reveal reveal-delay-2">
                            <div className="solution-icon" aria-hidden="true">◎</div>
                            <h3>Soal Lebih Sesuai</h3>
                            <p>
                                Dibuat berdasarkan pola tes terbaru. Tim kami rutin update soal agar selalu relevan dengan materi yang keluar di tes sesungguhnya.
                            </p>
                            <span className="solution-badge">Update Rutin</span>
                        </article>

                        <article className="solution-card reveal reveal-delay-3">
                            <div className="solution-icon" aria-hidden="true">▶</div>
                            <h3>Video + PDF Pembahasan</h3>
                            <p>
                                Tidak cukup hanya tahu jawaban benar. Pahami konsepnya lewat video penjelasan dan PDF yang bisa diunduh untuk belajar offline.
                            </p>
                            <span className="solution-badge">Belajar Mendalam</span>
                        </article>
                    </div>
                </div>
            </section>

            {/* ============ TESTIMONIALS SECTION ============ */}
            <section className="testimonials" aria-labelledby="testimonials-title">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Kata Mereka</span>
                        <h2 id="testimonials-title" className="section-title">Bukti Nyata dari Pengguna</h2>
                        <p className="section-subtitle">
                            Ribuan peserta sudah merasakan manfaatnya dan berhasil lulus tes. Berikut cerita sukses mereka.
                        </p>
                    </div>

                    <div className="testimonial-cards">
                        <article className="testimonial-card reveal reveal-delay-1">
                            <p className="testimonial-quote">
                                "Awalnya ragu, tapi setelah coba tryoutnya, langsung ketagihan! Soalnya beneran mirip sama tes asli. Astungkara lulus di percobaan pertama."
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar" aria-hidden="true">AR</div>
                                <div className="testimonial-info">
                                    <h4>Kadek Agus Diantara</h4>
                                    <p>Bintara Brimob 2026</p>
                                </div>
                                <span className="testimonial-result">LULUS</span>
                            </div>
                        </article>

                        <article className="testimonial-card reveal reveal-delay-2">
                            <p className="testimonial-quote">
                                "Soal-soalnya sangat mirip dengan tes aslinya. Sistemnya juga sangat akurat."
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar" aria-hidden="true">DS</div>
                                <div className="testimonial-info">
                                    <h4>Kadek Ade Widi Adnyana</h4>
                                    <p>Bintara Brimob 2026</p>
                                </div>
                                <span className="testimonial-result">LULUS</span>
                            </div>
                        </article>

                        <article className="testimonial-card reveal reveal-delay-3">
                            <p className="testimonial-quote">
                                "Fitur timer-nya bikin terlatih ngerjain cepat. Dulu sering kehabisan waktu, sekarang bisa selesai dengan santai."
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar" aria-hidden="true">BW</div>
                                <div className="testimonial-info">
                                    <h4>Putu Wahyu Satria Wibawa</h4>
                                    <p>Bintara Brimob 2026</p>
                                </div>
                                <span className="testimonial-result">LULUS</span>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* ============ CTA SECTION ============ */}
            <section className="cta" id="langganan" aria-labelledby="cta-title">
                <div className="container">
                    <div className="cta-box reveal">
                        <h2 id="cta-title">Siap Wujudkan Mimpimu Jadi Polisi?</h2>
                        <p>
                            Jangan biarkan persiapan yang salah menghancurkan impianmu. Mulai sekarang dengan platform yang sudah terbukti!
                        </p>

                        <div className="cta-price">
                            <div className="price-display">
                                <span className="price-original">Rp500.000</span>
                                <span className="price-discount cta-price-value">Rp150.000<span className="cta-price-period"> / 3 bulan</span></span>
                            </div>
                            <span className="cta-savings">Hemat Rp350.000</span>
                        </div>

                        <div className="cta-buttons">
                            <button onClick={handleBelajarSekarang} className="btn btn-primary btn-lg" aria-label="Mulai belajar sekarang untuk persiapan tes polisi">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                                Mulai Belajar Sekarang
                            </button>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="btn btn-whatsapp btn-lg" aria-label="Konsultasi via WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Konsultasi Dulu
                            </a>
                        </div>

                        <div className="cta-guarantee">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-guarantee-icon" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            Pembayaran aman dan terenkripsi
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FLOATING CTA (Mobile) ============ */}
            <div className="floating-cta" role="navigation" aria-label="Mobile navigation">
                <button onClick={handleBelajarSekarang} className="btn btn-primary" aria-label="Belajar sekarang">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                    Belajar Sekarang
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="btn btn-whatsapp" aria-label="Tanya via WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Tanya Dulu
                </a>
            </div>

            {/* ============ MODAL COMPONENTS ============ */}
            {/* Auth Modal */}
            <AuthModal
                isOpen={flowState === 'auth'}
                onClose={handleCloseModal}
                onSuccess={handleAuthSuccess}
            />

            {/* Payment Checkout */}
            {flowState === 'checkout' && snapToken && (
                <PremiumCheckout
                    snapToken={snapToken}
                    onPaymentSuccess={handlePaymentSuccess}
                    onClose={handleCloseModal}
                />
            )}

            {/* Payment Success */}
            {flowState === 'success' && (
                <PaymentSuccess redirectUrl={DASHBOARD_URL} />
            )}
        </>
    )
}
