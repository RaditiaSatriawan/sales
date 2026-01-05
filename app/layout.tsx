import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Polisimuda - Tryout Realtime & Pembahasan Lengkap | Lulus Tes Polisi',
    description: 'Platform tryout terbaik untuk persiapan tes masuk Polisi dan Bintara. Soal sesuai, tryout realtime, dan video + PDF pembahasan lengkap. Cuma Rp 300.000 untuk 3 bulan!',
    keywords: 'tryout polisi, tryout bintara, tes polisi, persiapan polisi, soal polisi, latihan tes polisi',
    openGraph: {
        title: 'Polisimuda - Lulus Tes Polisi dengan Tryout Realtime',
        description: 'Platform tryout terbaik untuk persiapan tes masuk Polisi. Mulai dari Rp 300.000/3 bulan.',
        type: 'website',
        url: 'https://polisimuda.com',
    },
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
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>{children}</body>
        </html>
    )
}
