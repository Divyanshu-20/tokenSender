import "./globals.css"
import type { Metadata } from "next"
import { type ReactNode } from "react"
import Header from "@/components/Header"
import { Providers } from "./providers"

export const metadata: Metadata = {
    title: "TSender",
    description: "Hyper gas-optimized bulk ERC20 token transfer",
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en" className="font-sans">
            <head>
                <link rel="icon" href="/logo.svg" sizes="any" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
            </head>
            <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
                <Providers>
                    <Header />
                    <main className="pt-28 px-4 pb-12 max-w-3xl mx-auto w-full">
                        {props.children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}