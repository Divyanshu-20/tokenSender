"use client";
import React, { useMemo, useState, useEffect } from "react";
import { InputField } from "./UI/InputField";
import { FaEthereum, FaUsers, FaPaperPlane } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { useChainId, useConfig, useAccount, useWriteContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, erc20Abi } from "../../constants";
import { calculateTotal } from "../utils/calculateTotal/calculateTotal";
import { tsenderAbi } from "@/constants";


export const AirdropForm = () => {
  const config = useConfig();
  const chainId = useChainId();
  const account = useAccount();
  // Load from localStorage on mount
  const [tokenAddress, setTokenAddress] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("airdrop_tokenAddress") || "" : ""
  );
  const [recipients, setRecipients] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("airdrop_recipients") || "" : ""
  );
  const [amounts, setAmounts] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("airdrop_amounts") || "" : ""
  );
  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);//anytime amounts is changed - use memo
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const [tokenName, setTokenName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  async function getApprovedAmount(tsenderAddress: string | null): Promise<number> {
    if (!tsenderAddress) {
      alert("No address found, please use supported chain");
      return 0;
    }
    try {
      const response = await readContract(config, {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        args: [account.address, tsenderAddress as `0x${string}`],
      });
      return response as number;
    } catch (error: any) {
      alert(
        `Error fetching allowance:\n` +
        `- The contract may not have an "allowance" function\n` +
        `- The token address may be wrong or not an ERC20\n` +
        `- Details: ${error?.message || error}`
      );
      return 0;
    }
  }

  const sendTokens = async () => {
    setIsLoading(true);
    try {
      const tsenderAddress = chainsToTSender[chainId]["tsender"];
      const approvedAmount = await getApprovedAmount(tsenderAddress);
      if (approvedAmount < total) {
        const approvalHash = await writeContractAsync({
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [tsenderAddress as `0x${string}`, BigInt(total)],
        });
        await waitForTransactionReceipt(config, { hash: approvalHash });
        await writeContractAsync({
          address: tsenderAddress as `0x${string}`,
          abi: tsenderAbi,
          functionName: "airdropERC20",
          args: [
            tokenAddress,
            recipients.split(/[\,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
            amounts.split(/[\,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
            BigInt(total),
          ],
        });
      } else {
        await writeContractAsync({
          address: tsenderAddress as `0x${string}`,
          abi: tsenderAbi,
          functionName: "airdropERC20",
          args: [
            tokenAddress,
            recipients.split(/[\,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
            amounts.split(/[\,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
            BigInt(total),
          ],
        });
      }
    } catch (error) {
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
  };
  
    // Save to localStorage whenever values change
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("airdrop_tokenAddress", tokenAddress);
      }
    }, [tokenAddress]);
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("airdrop_recipients", recipients);
      }
    }, [recipients]);
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("airdrop_amounts", amounts);
      }
    }, [amounts]);

    // Fetch token name when tokenAddress changes
    useEffect(() => {
      async function fetchTokenName() {
        if (!tokenAddress || tokenAddress.length !== 42) {
          setTokenName(null);
          return;
        }
        try {
          console.log("Fetching name for:", tokenAddress);
          const name = await readContract(config, {
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: "name",
          });
          console.log("Fetched name:", name);
          setTokenName(name as string);
        } catch (err) {
          console.error("Error fetching token name:", err);
          setTokenName(null);
        }
      }
      fetchTokenName();
    }, [tokenAddress]);
  
    return (
      <div className="w-full bg-gray-800/70 rounded-xl overflow-hidden border border-white/5 shadow-2xl backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-white/10">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 bg-gradient-to-r from-gray-800 to-gray-800/80 hover:from-gray-800/90 hover:to-gray-800/70 transition-all duration-500">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-blue-500/10">
              <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-300">Token Airdrop</h2>
              <p className="text-xs text-blue-300/80 mt-1.5">Send tokens to multiple addresses in one transaction</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/60 font-medium hover:text-white/80 transition-colors duration-300">Hyper-efficient bulk ERC20 transfers</p>
        </div>
  
        {/* Form Section */}
        <div className="px-6 py-6 space-y-5 animate-fadeIn">
          <InputField
            label="Token Address"
            placeholder="0x..."
            value={tokenAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTokenAddress(e.target.value)}
            icon={FaEthereum}
          />
          <InputField
            label="Recipients (comma or new line separated)"
            placeholder="0x123..., 0x456..."
            value={recipients}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setRecipients(e.target.value)}
            isTextArea
            icon={FaUsers}
          />
          <InputField
            label="Amounts (wei; comma or new line separated)"
            placeholder="100, 200, 300..."
            value={amounts}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAmounts(e.target.value)}
            isTextArea
            icon={FiFileText}
          />
        </div>
  
        {/* Transaction Summary Section */}
        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-1.5 group">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-2 transform group-hover:scale-x-125 transition-transform duration-300"></div>
            <h3 className="text-[15px] font-medium text-white/90">Transaction Summary</h3>
            <p className="text-[13px] text-white/50">Review the transaction details before sending</p>
          </div>
          <div className="space-y-3 bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <span className="text-[14px] text-white/70">Token Name</span>
              <span className="text-[14px] font-medium text-white">{tokenName || "-"}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <span className="text-[14px] text-white/70">Amount (wei)</span>
              <span className="text-[14px] font-mono text-white/95">{total}</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-[14px] text-white/70">Amount (tokens)</span>
              <span className="text-[14px] font-mono text-white/95">{(total / 1e18).toFixed(2)}</span>
            </div>
          </div>
        </div>
  
        {/* Action Button */}
        <div className="px-6 py-5 bg-gray-800/50 border-t border-white/5 hover:bg-gray-800/70 transition-colors duration-300 relative">
          <button
            onClick={sendTokens}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/40 active:scale-[0.98] hover:from-blue-400 hover:to-blue-500 transform hover:-translate-y-0.5 hover:scale-[1.01]"
            disabled={isLoading}
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            <FaPaperPlane className="h-4 w-4" />
            <span>Send Tokens</span>
          </button>
        </div>
      </div>
    );
  };


