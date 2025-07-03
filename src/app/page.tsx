"use client"

import { AirdropForm } from "../components/AirdropForm";
import { Providers } from "./providers";

export default function Home() {
  return (
    <Providers>
      <div>
        <AirdropForm />
      </div>
    </Providers>
  )
}
