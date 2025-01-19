import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track and manage your expenses with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${jakarta.variable}`}>
      <body className={`${jakarta.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}