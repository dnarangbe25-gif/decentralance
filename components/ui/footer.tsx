"use client";

import React from "react";
import Link from "next/link";
import { Zap, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="pt-32 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-16 text-white/40 pb-12">
      <div className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan/40 transition-colors">
            <Zap className="text-cyan fill-cyan" size={22} />
          </div>
          <span className="text-xl font-syne font-extrabold tracking-tighter text-white uppercase">DECENTRALANCE</span>
        </Link>
        <p className="text-base max-w-xs leading-relaxed">
          Empowering the world's most talented creators with trustless payments and sovereign on-chain identity.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 text-sm">
        <div className="flex flex-col gap-5">
          <span className="font-bold text-white tracking-widest uppercase text-xs">Platform</span>
          <Link href="/jobs" className="hover:text-cyan transition-colors">Marketplace</Link>
          <Link href="/dashboard" className="hover:text-cyan transition-colors">Stake LANCE</Link>
          <Link href="/jobs/new" className="hover:text-cyan transition-colors">Post a Job</Link>
          <Link href="/#how-it-works" className="hover:text-cyan transition-colors">Protocol</Link>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-bold text-white tracking-widest uppercase text-xs">Developer</span>
          <a href="https://soroban.stellar.org/" target="_blank" className="hover:text-cyan transition-colors">Soroban SDK</a>
          <a href="https://github.com/dnarangbe25-gif/decentralance" target="_blank" className="hover:text-cyan transition-colors">Audit Reports</a>
          <a href="#" className="hover:text-cyan transition-colors">Governance</a>
          <a href="#" className="hover:text-cyan transition-colors">API Docs</a>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-bold text-white tracking-widest uppercase text-xs">Connect</span>
          <a href="https://twitter.com/stellarorg" target="_blank" className="hover:text-cyan transition-colors">Twitter / X</a>
          <a href="https://discord.com/invite/stellar" target="_blank" className="hover:text-cyan transition-colors">Discord</a>
          <a href="#" className="hover:text-cyan transition-colors">Telegram</a>
          <a href="https://github.com/dnarangbe25-gif/decentralance" target="_blank" className="hover:text-cyan transition-colors">GitHub</a>
        </div>
      </div>

      <div className="flex flex-col items-end gap-6 w-full md:w-auto">
        <div className="flex items-center gap-4 glass px-6 py-3 rounded-2xl border-white/5 hover:border-cyan/20 transition-colors group">
          <span className="text-xs font-mono tracking-widest">ECOSYSTEM</span>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-navy rounded-full" />
            </div>
            <span className="text-xs font-black text-white tracking-tighter">STELLAR</span>
          </div>
        </div>
        <p className="text-xs font-mono opacity-50 uppercase tracking-[0.2em]">© 2026 DECENTRALANCE // CORE v1.0</p>
      </div>
    </footer>
  );
}
