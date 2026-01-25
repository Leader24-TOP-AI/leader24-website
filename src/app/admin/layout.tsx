import { ThemeProvider } from 'next-themes'
import { AdminProvider } from '@/context/AdminContext'

export const metadata = {
  title: 'Admin Panel | Leader24',
  description: 'Leader24 CMS Admin Panel',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminProvider>
        {children}
      </AdminProvider>
    </ThemeProvider>
  )
}
