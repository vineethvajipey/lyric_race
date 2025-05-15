import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeHydrationGuard } from "@/components/theme-hydration-guard"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LyricRace",
  description: "Sing fast. Sing true.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeHydrationGuard>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ThemeHydrationGuard>
      </body>
    </html>
  )
}
