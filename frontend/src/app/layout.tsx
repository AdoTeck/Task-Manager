import type { Metadata } from 'next'
import '../styles/globals.css'
import ReduxProvider from './providers/ReduxProvider'
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProjectPro - Task Management Platform",
  description: "Streamline your workflow, collaborate effortlessly, and deliver projects on time",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark transition-colors duration-300`}
      >
        <ReduxProvider>
        <ThemeProvider>{children}</ThemeProvider></ReduxProvider>
      </body>
    </html>
  )
}
