"use client";

import React, { useState, useEffect } from "react";
import { getWalletAddress, connectWallet } from "@/lib/stellar/wallet";
import { GlowButton } from "@/components/ui/glow-button";
import { Wallet, LogOut } from "lucide-react";

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkConnection = async () => {
    try {
      const addr = await getWalletAddress();
      if (addr) setAddress(addr);
    } catch (err) {
      console.error("Connection check failed:", err);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const connect = async () => {
    setLoading(true);
    try {
      const addr = await connectWallet();
      if (addr) {
        setAddress(addr);
      }
    } catch (e: any) {
      console.error("Wallet connection failed:", e);
      // If it fails because not installed, open the website
      if (e.message?.includes("not installed")) {
        window.open("https://www.freighter.app/", "_blank");
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-xl glass border-cyan/20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-sm font-mono text-cyan/90">
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
        </div>
        <button 
          onClick={disconnect}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10"
          title="Disconnect"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <GlowButton onClick={connect} disabled={loading}>
      <Wallet size={18} />
      {loading ? "Connecting..." : "Connect Wallet"}
    </GlowButton>
  );
}
