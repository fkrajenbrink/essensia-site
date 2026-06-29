import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Frank Krajenbrink | Essensia Carrière Coaching',
  description: 'A&O Psycholoog NIP en eigenaar van Essensia Carrière Coaching in Amsterdam. Loopbaancoaching, assessments en reïntegratie voor medewerkers, managers en organisaties.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
