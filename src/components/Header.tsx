"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub, FaReddit } from "react-icons/fa"
import { useEffect } from "react"

export default function Header() {
  useEffect(() => {
    // setFoo(1); // Removed undefined function call
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between bg-gray-900/90 backdrop-blur-lg border-b border-white/[0.03] w-full transition-all duration-300 hover:bg-gray-900/95 hover:backdrop-blur-xl">
      <div className="flex items-center space-x-6">
        <a href="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
            <img src="/logo.svg" alt="TSender" width={20} height={20} className="text-white" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent hidden md:block transition-all duration-300 group-hover:from-blue-300 group-hover:to-blue-200">
            TSender
          </h1>
        </a>
        <a
          href="https://github.com/divyanshu-20"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors border-2 border-zinc-600 hover:border-zinc-500 cursor-alias hidden md:block"
        >
          <FaGithub className="h-5 w-5 text-white" />
        </a>
      </div>
      <div className="hidden lg:flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5 text-sm text-blue-300 font-medium hover:from-blue-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5">
          The most gas efficient airdrop contract on earth 🚀
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="https://www.reddit.com/user/divyanshu022/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-100"
          aria-label="GitHub"
        >
          <FaReddit className="h-5 w-5 text-[#ed825c]" />
        </a>
        <div className="h-6 w-px bg-white/10"></div>
        <ConnectButton />
      </div>
    </nav>
  )
}