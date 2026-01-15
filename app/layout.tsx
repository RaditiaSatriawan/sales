import type { Metadata } from 'next'
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
            <body>{children}</body>
        </html>
    )
}
