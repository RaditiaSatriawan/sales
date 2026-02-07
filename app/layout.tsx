import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
    title: 'Polisimuda - Tryout Polisi Online Terbaik | Persiapan Tes Bintara Polri',
    description: 'Platform tryout online terpercaya untuk persiapan tes masuk Polisi dan Bintara Polri. Tryout realtime, soal sesuai tes asli, video & PDF pembahasan lengkap. Ribuan alumni sudah lulus!',
    keywords: [
        'tryout polisi online',
        'tryout bintara',
        'tes polisi 2026',
        'persiapan tes polri',
        'soal tes polisi',
        'latihan tes bintara',
        'tryout polri online',
        'bimbel polisi',
        'tryout brimob',
        'tes akademik polisi',
        'soal CAT polisi',
        'persiapan masuk polisi'
    ],
    authors: [{ name: 'Polisimuda' }],
    creator: 'Polisimuda',
    publisher: 'Polisimuda',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Polisimuda - Tryout Polisi Online Terbaik | Lulus Tes Bintara Polri',
        description: 'Platform tryout online terpercaya untuk persiapan tes masuk Polisi. Tryout realtime dengan soal sesuai tes asli. Mulai dari Rp 150.000/3 bulan.',
        type: 'website',
        url: 'https://polisimuda.com',
        siteName: 'Polisimuda',
        locale: 'id_ID',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Polisimuda - Tryout Polisi Online Terbaik',
        description: 'Platform tryout online untuk persiapan tes masuk Polisi dan Bintara Polri. Ribuan alumni sudah lulus!',
    },
    alternates: {
        canonical: 'https://polisimuda.com',
    },
    category: 'education',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/logo-tab.png" />
                <link rel="apple-touch-icon" href="/logo-tab.png" />
                <link rel="canonical" href="https://polisimuda.com" />
                <meta name="theme-color" content="#1e40af" />
                <meta name="google-site-verification" content="" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "EducationalOrganization",
                            "name": "Polisimuda",
                            "description": "Platform tryout online terpercaya untuk persiapan tes masuk Polisi dan Bintara Polri",
                            "url": "https://polisimuda.com",
                            "sameAs": [],
                            "offers": {
                                "@type": "Offer",
                                "name": "Paket Tryout 3 Bulan",
                                "price": "150000",
                                "priceCurrency": "IDR",
                                "availability": "https://schema.org/InStock"
                            }
                        })
                    }}
                />
            </head>
            <body>
                {children}
                {/* Meta Pixel Code */}
                <Script
                    id="fb-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (!window.fbq || !window.fbq.version) {
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '1546016519959409');
                                fbq('track', 'PageView');
                            }
                        `
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=1546016519959409&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
            </body>
        </html>
    )
}
