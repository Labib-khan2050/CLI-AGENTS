import './globals.css'
import 'highlight.js/styles/github-dark.css'
import ThemeProvider from '@/components/ThemeProvider'
import GlobalSettingsProvider from '@/contexts/GlobalSettingsContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import { Metadata } from 'next'
import { AuthReceiver } from '@/lib/auth-receiver-wrapper'

export const metadata: Metadata = {
  title: 'Coding Agents',
  description: 'Coding Agents - AI-Powered Development Platform',
  icons: {
    icon: '/Claudable_Icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
        <AuthReceiver />
        <ThemeProvider>
          <AuthProvider>
            <GlobalSettingsProvider>
              <Header />
              <main className="transition-colors duration-200">{children}</main>
            </GlobalSettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
