'use client'

import { useEffect, useState, useRef } from 'react'

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false)

    // Placeholder URLs - ganti dengan URL asli
    const WHATSAPP_URL = "https://wa.me/6285128012705?text=Halo%20Polisimuda%2C%20saya%20tertarik%20untuk%20berlangganan"
    const SUBSCRIBE_URL = "https://polisimuda.com/sales/premium"

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
            <section className="hero">
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
                                alt="Polisimuda Logo"
                                className="hero-logo"
                            />

                            <div className="hero-badge">
                                <span className="hero-badge-icon">🎯</span>
                                Platform Tryout #1 untuk Calon Polisi
                            </div>

                            <h1>
                                Lulus Tes Polisi dengan <span>Tryout Realtime</span> & Pembahasan Lengkap
                            </h1>

                            <p className="hero-subtitle">
                                Persiapkan dirimu dengan soal-soal yang SESUAI dengan tes asli,
                                ditambah video dan PDF pembahasan yang mudah dipahami.
                            </p>

                            <div className="hero-price">
                                <p className="hero-price-label">Investasi masa depanmu</p>
                                <div className="price-display">
                                    <span className="price-original">Rp 1.000.000</span>
                                    <span className="price-discount">
                                        Rp 300.000
                                        <span className="hero-price-period"> / 3 bulan</span>
                                    </span>
                                </div>
                                <span className="hero-price-savings">🔥 Hemat Rp 700.000 (70%)</span>
                            </div>

                            <div className="hero-buttons">
                                <a href={SUBSCRIBE_URL} className="btn btn-primary btn-lg">
                                    🚀 Belajar Sekarang
                                </a>
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                                    💬 Tanya via WhatsApp
                                </a>
                            </div>

                            <div className="hero-features">
                                <div className="hero-feature">
                                    <span className="hero-feature-icon">✓</span>
                                    Akses penuh 3 bulan
                                </div>
                                <div className="hero-feature">
                                    <span className="hero-feature-icon">✓</span>
                                    Update soal rutin
                                </div>
                                <div className="hero-feature">
                                    <span className="hero-feature-icon">✓</span>
                                    Support 24/7
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Graduate Photos */}
                        <div className="hero-graduates">
                            <div className="hero-graduate hero-graduate-1">
                                <img
                                    src="/brimob1.jpg"
                                    alt="Lulusan Brimob dari Polisimuda"
                                    className="hero-graduate-image"
                                />
                                <div className="hero-graduate-label">
                                    <span className="hero-graduate-badge">✓</span>
                                    <span className="hero-graduate-role">Anggota Brimob</span>
                                </div>
                            </div>

                            <div className="hero-graduate hero-graduate-2">
                                <img
                                    src="/brimob2.jpg"
                                    alt="Lulusan Polri dari Polisimuda"
                                    className="hero-graduate-image"
                                />
                                <div className="hero-graduate-label">
                                    <span className="hero-graduate-badge">✓</span>
                                    <span className="hero-graduate-role">Anggota Brimob</span>
                                </div>
                            </div>

                            <div className="hero-graduate hero-graduate-3">
                                <img
                                    src="/brimob3.jpg"
                                    alt="Lulusan Brimob dari Polisimuda"
                                    className="hero-graduate-image"
                                />
                                <div className="hero-graduate-label">
                                    <span className="hero-graduate-badge">✓</span>
                                    <span className="hero-graduate-role">Anggota Brimob</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ PROBLEM SECTION ============ */}
            <section className="problem">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">⚠️ Masalah yang Sering Dihadapi</span>
                        <h2 className="section-title">Apakah Kamu Mengalami Ini?</h2>
                        <p className="section-subtitle">
                            Banyak calon polisi gagal bukan karena tidak mampu,
                            tapi karena salah strategi persiapan.
                        </p>
                    </div>

                    <div className="problem-cards">
                        <div className="problem-card reveal reveal-delay-1">
                            <div className="problem-icon">😰</div>
                            <div className="problem-content">
                                <h3>Bingung Mulai dari Mana</h3>
                                <p>Materi terlalu banyak, tidak tahu harus fokus ke bagian mana dulu untuk mendapatkan hasil maksimal.</p>
                            </div>
                        </div>

                        <div className="problem-card reveal reveal-delay-2">
                            <div className="problem-icon">📚</div>
                            <div className="problem-content">
                                <h3>Soal Latihan Tidak Sesuai</h3>
                                <p>Belajar dari soal yang ternyata beda jauh dengan tes asli, jadi tidak terbiasa dengan pola soalnya.</p>
                            </div>
                        </div>

                        <div className="problem-card reveal reveal-delay-3">
                            <div className="problem-icon">⏰</div>
                            <div className="problem-content">
                                <h3>Tidak Terbiasa dengan Waktu</h3>
                                <p>Saat tes, panik karena tidak terlatih mengerjakan soal dengan batas waktu yang ketat.</p>
                            </div>
                        </div>

                        <div className="problem-card reveal reveal-delay-4">
                            <div className="problem-icon">❓</div>
                            <div className="problem-content">
                                <h3>Salah Tapi Tidak Tahu Alasannya</h3>
                                <p>Hanya tahu jawaban benar, tapi tidak paham konsep di baliknya. Kesalahan yang sama terus terulang.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SOLUTION SECTION ============ */}
            <section className="solution">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">✨ Solusi dari Polisimuda</span>
                        <h2 className="section-title">Kenapa Ribuan Orang Memilih Kami?</h2>
                        <p className="section-subtitle">
                            3 keunggulan utama yang membuat platform kami berbeda
                            dan sudah terbukti membantu banyak peserta lulus.
                        </p>
                    </div>

                    <div className="solution-cards">
                        <div className="solution-card reveal reveal-delay-1">
                            <div className="solution-icon">⚡</div>
                            <h3>Tryout Realtime</h3>
                            <p>
                                Simulasi tes seperti aslinya! Timer berjalan,
                                soal acak, dan langsung lihat skor setelah selesai.
                                Latih mental dan kecepatanmu setiap hari.
                            </p>
                            <span className="solution-badge">🔥 Fitur Unggulan</span>
                        </div>

                        <div className="solution-card reveal reveal-delay-2">
                            <div className="solution-icon">🎯</div>
                            <h3>Soal Lebih Sesuai</h3>
                            <p>
                                Dibuat berdasarkan pola tes terbaru.
                                Tim kami rutin update soal agar selalu relevan
                                dengan materi yang keluar di tes sesungguhnya.
                            </p>
                            <span className="solution-badge">📅 Update Rutin</span>
                        </div>

                        <div className="solution-card reveal reveal-delay-3">
                            <div className="solution-icon">📹</div>
                            <h3>Video + PDF Pembahasan</h3>
                            <p>
                                Tidak cukup hanya tahu jawaban benar.
                                Pahami konsepnya lewat video penjelasan dan
                                PDF yang bisa diunduh untuk belajar offline.
                            </p>
                            <span className="solution-badge">📖 Belajar Mendalam</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ TESTIMONIALS SECTION ============ */}
            <section className="testimonials">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">💬 Kata Mereka</span>
                        <h2 className="section-title">Bukti Nyata dari Pengguna</h2>
                        <p className="section-subtitle">
                            Ribuan peserta sudah merasakan manfaatnya dan berhasil lulus tes.
                            Berikut cerita sukses mereka.
                        </p>
                    </div>

                    <div className="testimonial-cards">
                        <div className="testimonial-card reveal reveal-delay-1">
                            <p className="testimonial-quote">
                                "Awalnya ragu, tapi setelah coba tryoutnya, langsung ketagihan! Soalnya beneran mirip sama tes asli. Astungkara lulus di percobaan pertama."
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">AR</div>
                                <div className="testimonial-info">
                                    <h4>Kadek Agus Diantara</h4>
                                    <p>Bintara Brimob 2026</p>
                                </div>
                                <span className="testimonial-result">✓ LULUS</span>
                            </div>
                        </div>

                        <div className="testimonial-card reveal reveal-delay-2">
                            <p className="testimonial-quote">
                                "Soal-soalnya sangat mirip dengan tes aslinya. Sistemnya juga sangat akurat"
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">DS</div>
                                <div className="testimonial-info">
                                    <h4>Kadek Ade Widi Adnyana</h4>
                                    <p>Bintara Brimob 2026</p>
                                </div>
                                <span className="testimonial-result">✓ LULUS</span>
                            </div>
                        </div>

                        <div className="testimonial-card reveal reveal-delay-3">
                            <p className="testimonial-quote">
                                "Fitur timer-nya bikin terlatih ngerjain cepat. Dulu sering kehabisan waktu, sekarang bisa selesai dengan santai."
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">BW</div>
                                <div className="testimonial-info">
                                    <h4>Putu Wahyu Satria Wibawa</h4>
                                    <p>Bintara Brimob 2026</p>
                                </div>
                                <span className="testimonial-result">✓ LULUS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CTA SECTION ============ */}
            <section className="cta" id="langganan">
                <div className="container">
                    <div className="cta-box reveal">
                        <h2>Siap Wujudkan Mimpimu Jadi Polisi?</h2>
                        <p>
                            Jangan biarkan persiapan yang salah menghancurkan impianmu.
                            Mulai sekarang dengan platform yang sudah terbukti!
                        </p>

                        <div className="cta-price">
                            <div className="price-display">
                                <span className="price-original">Rp 1.000.000</span>
                                <span className="price-discount cta-price-value">
                                    Rp 300.000
                                    <span className="cta-price-period"> / 3 bulan</span>
                                </span>
                            </div>
                            <span className="cta-savings">🔥 Hemat Rp 700.000</span>
                        </div>

                        <div className="cta-buttons">
                            <a href={SUBSCRIBE_URL} className="btn btn-primary btn-lg">
                                🚀 Mulai Belajar Sekarang
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                                💬 Konsultasi Dulu
                            </a>
                        </div>

                        <div className="cta-guarantee">
                            <span className="cta-guarantee-icon">🔒</span>
                            Pembayaran aman & terenkripsi
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FLOATING CTA (Mobile) ============ */}
            <div className="floating-cta">
                <a href={SUBSCRIBE_URL} className="btn btn-primary">
                    🚀 Belajar Sekarang
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    💬 Tanya Dulu
                </a>
            </div>
        </>
    )
}
