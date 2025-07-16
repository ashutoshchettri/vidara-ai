import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import CustomSessionProvider from "@/components/session-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Vidara",
  description: "Open Minds, Infinite Paths.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CustomSessionProvider>{children}</CustomSessionProvider>
      </body>
    </html>
  )
}
