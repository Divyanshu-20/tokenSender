"useClient"

import { AirdropForm } from "./AirdropForm";
import  {useAccount, useClient} from "wagmi";

export default function HomeContent() {
    const {isConnected} = useAccount();
  return (
    <div>
        {!isConnected ? (
          <div className="relative flex flex-col items-center justify-center py-12 overflow-hidden">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-4 animate-bounce">
              <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.12"/>
              <path fill="#fff" d="M11 7h2v4h-2V7Zm0 6h2v2h-2v-2Z"/>
            </svg>
            <p className="text-lg font-semibold text-white mb-1 transition-all duration-500 animate-fade-in">Wallet Not Connected</p>
            <p className="text-sm text-white/70 animate-pulse">Connect your wallet to use the airdrop feature.</p>
          </div>
        ) : (
          <div><AirdropForm /></div>
        )}
    </div>
  );
}