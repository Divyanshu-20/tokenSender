"use client"

import HomeContent from "@/components/HomeContent";
import { Providers } from "./providers";

export default function Home() {
  return (
    <Providers>
      <div>
        <HomeContent />
      </div>
    </Providers>
  )
}
