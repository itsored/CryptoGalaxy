import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CosmicBackground } from "@/components/cryptogalaxy/cosmic-background"
import { SiteNavbar } from "@/components/cryptogalaxy/site-navbar"
import { SiteFooter } from "@/components/cryptogalaxy/site-footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "CryptoGalaxy | Kenyan Web3 Community",
    template: "%s | CryptoGalaxy",
  },
  description:
    "CryptoGalaxy is a Kenyan-based crypto community focused on workshops, events, and Web3 collaboration.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <CosmicBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteNavbar />
          <main className="flex-1 pt-24">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
