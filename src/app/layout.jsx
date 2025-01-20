import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={jakarta.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <div className="min-h-screen bg-background font-sans antialiased">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}