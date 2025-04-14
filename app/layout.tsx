import { Providers } from "./provider";
import type { ReactNode } from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import { Content as FontHeading } from "next/font/google" // Changed from Content to Inter
import { cn } from "@/lib/utils"
import { ThemeProvider } from "./components/theme-provider"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = FontHeading({
  subsets: ["khmer"],
  weight: ["700"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "BeatNet - Music Powered by Democracy",
  description: "Vote for your favorite songs and let the crowd decide what plays next.",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
