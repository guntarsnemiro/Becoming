import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Becoming - Your Personal Growth Journey',
  description: 'A calm, mindful approach to personal growth and self-improvement. Track your progress across life areas and become the person you want to be.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
