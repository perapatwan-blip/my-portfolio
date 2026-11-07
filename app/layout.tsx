import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PERAPAT.W | Next-Gen Full-Stack & ICT Innovator',
  description: 'Portfolio of Perapat Wanna (นาย พีรพัตน์ วันนา) - 2nd Year ICT Undergraduate at Sripatum University (SPU). Luxury Cyberpunk Bento-Grid Architecture.',
  keywords: ['Perapat Wanna', 'พีรพัตน์ วันนา', 'ICT SPU', 'Sripatum University', 'Full-Stack Developer', 'Cyberpunk Portfolio', 'Bento Grid'],
  authors: [{ name: 'Perapat Wanna' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#dc2626',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050508] text-white selection:bg-crimson-600 selection:text-white antialiased">
        <div className="cyber-bg-grid" />
        <div className="glow-orb-crimson" />
        <div className="glow-orb-gold" />
        <div className="glow-orb-center" />

        {children}
      </body>
    </html>
  )
}
