"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useEffect, useState } from "react"
import { WagmiProvider } from "wagmi"
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import config from "./rainbowKitConfig"
import "@rainbow-me/rainbowkit/styles.css"

export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [wagmiConfig, setWagmiConfig] = useState(config)

    // ✅ GOOD: Only runs once on mount
    useEffect(() => {
        setWagmiConfig(config)
    }, [])

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={lightTheme({ borderRadius: "medium" })}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}