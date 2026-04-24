"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WalletConnect } from "@/components/features/wallet-connect";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Reveal } from "@/components/ui/reveal";
import { 
  Zap, 
  Menu, 
  X, 
  Search, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Users,
  Lock,
  Globe,
  Monitor
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-cyan/30 selection:text-cyan">
      {/* Background Orbs */}
      <div className="orb w-96 h-96 bg-cyan/10 top-[-10%] left-[-5%]" />
      <div className="orb w-[500px] h-[500px] bg-violet/10 bottom-[10%] right-[-10%] opacity-50" style={{ animationDelay: '2s' }} />
      <div className="orb w-80 h-80 bg-cyan/5 top-[40%] left-[20%] opacity-30" style={{ animationDelay: '4s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-x-0 border-t-0 rounded-none bg-navy/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-violet flex items-center justify-center shadow-lg shadow-cyan/10 group-hover:scale-110 transition-transform">
              <Zap className="text-navy fill-navy" size={22} />
            </div>
            <span className="text-xl font-syne font-extrabold tracking-tighter">DECENTRALANCE</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium text-white/60 hover:text-cyan transition-colors">How It Works</Link>
            <Link href="#features" className="text-sm font-medium text-white/60 hover:text-cyan transition-colors">Features</Link>
            <Link href="/jobs" className="text-sm font-medium text-white/60 hover:text-cyan transition-colors">Browse Jobs</Link>
            <div className="h-6 w-px bg-white/10" />
            <WalletConnect />
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white/80 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-x-0 border-b-0 rounded-none p-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-6 font-medium">
              <a href="#how-it-works" className="text-lg" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#features" className="text-lg" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#jobs" className="text-lg" onClick={() => setIsMenuOpen(false)}>Browse Jobs</a>
              <div className="h-px w-full bg-white/10" />
              <WalletConnect />
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <section className="text-center mb-16 pt-12">
          <Reveal width="100%">
            <h1 className="text-5xl md:text-8xl mb-8 leading-[1.05] tracking-tight">
              Work Without <span className="text-white/40 italic">Borders.</span><br />
              Pay Without <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan via-cyan to-violet">Banks.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4} width="100%">
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-medium">
              The first trustless freelance marketplace built on Stellar. 
              Secure your work with <strong className="text-white">Soroban Smart Escrows</strong> and build 
              reputation with <strong className="text-white">LANCE staking</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.6} width="100%">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/dashboard">
                <GlowButton className="px-10 py-4 text-lg min-w-[200px] w-full">
                  Find Talent
                </GlowButton>
              </Link>
              <Link href="/jobs">
                <GlowButton variant="secondary" className="px-10 py-4 text-lg min-w-[200px] w-full">
                  Get Hired
                </GlowButton>
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Stats Bar */}
        <Reveal delay={0.8} width="100%">
          <div className="flex justify-center mb-40">
            <div className="px-8 py-5 glass border-cyan/20 flex flex-wrap justify-center gap-x-12 gap-y-4 animate-[pulse-soft_4s_ease-in-out_infinite] shadow-[0_0_40px_rgba(0,229,255,0.05)]">
              <div className="flex items-center gap-2.5">
                <TrendingUp size={18} className="text-cyan" />
                <span className="text-sm font-bold tracking-wide">847 Jobs Posted</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <Users size={18} />
                <span className="text-sm font-bold tracking-wide">1.2K Freelancers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock size={18} className="text-violet" />
                <span className="text-sm font-bold tracking-wide">$284K Escrowed</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <ShieldCheck size={18} className="text-green-400" />
                <span className="text-sm font-bold tracking-wide">99.1% Dispute-Free</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* How It Works */}
        <section id="how-it-works" className="mb-56 relative">
          <div className="text-center mb-24">
            <Reveal width="100%">
              <h2 className="text-4xl md:text-6xl mb-6">The Trustless Protocol</h2>
            </Reveal>
            <Reveal delay={0.4} width="100%">
              <p className="text-white/40 text-lg">From posting to payment, fully automated on-chain.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Animated Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-white/10 -z-10" />
            
            {[
              { step: "01", title: "Post Job", icon: <Monitor size={28} />, desc: "Define your project scope, budget, and milestones in minutes." },
              { step: "02", title: "Escrow Funds", icon: <Lock size={28} />, desc: "Clients deposit milestones into the Soroban smart contract secure vault." },
              { step: "03", title: "Release Payment", icon: <Zap size={28} />, desc: "Funds release instantly to your wallet upon milestone approval." }
            ].map((s, i) => (
              <Reveal key={i} delay={0.2 * (i + 1)}>
                <GlassCard className="p-10 text-center flex flex-col items-center h-full hover:border-cyan/40 transition-all group">
                  <span className="text-7xl font-syne font-black text-white/[0.03] mb-6 absolute top-4 right-8 group-hover:text-cyan/[0.03] transition-colors">{s.step}</span>
                  <div className="w-20 h-20 rounded-2xl bg-cyan/10 flex items-center justify-center text-cyan mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    {s.icon}
                  </div>
                  <h4 className="text-2xl mb-4 font-syne">{s.title}</h4>
                  <p className="text-white/50 leading-relaxed">{s.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="mb-56">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <Reveal width="100%">
                <h2 className="text-5xl md:text-7xl mb-12 leading-tight">Built for the <br /><span className="text-cyan">Stellar Era.</span></h2>
              </Reveal>
              <div className="space-y-12">
                {[
                  { icon: <ShieldCheck className="text-cyan" />, title: "Milestone Escrow", desc: "No more payment anxiety. Funds are secured by audited smart contracts, not centralized middlemen." },
                  { icon: <Zap className="text-violet" />, title: "LANCE Staking", desc: "Stake tokens to prove your commitment, unlock higher fee tiers, and participate in protocol governance." },
                  { icon: <Sparkles className="text-amber" />, title: "On-Chain Reputation", desc: "Your job history is immutable and verifiable. Build a profile that survives platform bans and resets." }
                ].map((f, i) => (
                  <Reveal key={i} delay={0.2 * (i + 1)} width="100%">
                    <div className="flex gap-8 items-start group">
                      <div className="p-4 rounded-2xl glass border-white/5 mt-1 group-hover:border-cyan/20 transition-colors">{f.icon}</div>
                      <div>
                        <h4 className="text-2xl mb-2 font-syne">{f.title}</h4>
                        <p className="text-white/40 text-lg leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="relative">
              <Reveal delay={0.6}>
                <GlassCard className="p-3 bg-gradient-to-br from-cyan/10 to-violet/10 border-white/10 overflow-hidden shadow-2xl">
                  <div className="aspect-square bg-navy/80 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                    
                    {/* Animated UI Elements Simulation */}
                    <div className="relative z-10 flex flex-col items-center gap-8">
                      <div className="p-6 rounded-full glass border-cyan/20 animate-[pulse-soft_4s_infinite]">
                        <Globe className="w-48 h-48 text-cyan/30" />
                      </div>
                      <div className="flex gap-6">
                        <StatusBadge status="In Progress" className="animate-bounce" />
                        <StatusBadge status="Open" className="animate-pulse shadow-[0_0_15px_rgba(0,229,255,0.2)]" />
                      </div>
                    </div>

                    {/* Decorative bits */}
                    <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-cyan/40" />
                    <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-violet/40" />
                    <div className="absolute top-1/2 right-4 w-1 h-1 rounded-full bg-white/20" />
                  </div>
                </GlassCard>
              </Reveal>
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan/20 blur-[100px] -z-10 animate-pulse" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet/20 blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-32 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-16 text-white/40">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan/40 transition-colors">
                <Zap className="text-cyan fill-cyan" size={22} />
              </div>
              <span className="text-xl font-syne font-extrabold tracking-tighter text-white">DECENTRALANCE</span>
            </div>
            <p className="text-base max-w-xs leading-relaxed">
              Empowering the world's most talented creators with trustless payments and sovereign on-chain identity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 text-sm">
            <div className="flex flex-col gap-5">
              <span className="font-bold text-white tracking-widest uppercase text-xs">Platform</span>
              <a href="#" className="hover:text-cyan transition-colors">Marketplace</a>
              <a href="#" className="hover:text-cyan transition-colors">Stake LANCE</a>
              <a href="#" className="hover:text-cyan transition-colors">Escrow Logic</a>
              <a href="#" className="hover:text-cyan transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-bold text-white tracking-widest uppercase text-xs">Developer</span>
              <a href="#" className="hover:text-cyan transition-colors">Soroban SDK</a>
              <a href="#" className="hover:text-cyan transition-colors">Audit Reports</a>
              <a href="#" className="hover:text-cyan transition-colors">Governance</a>
              <a href="#" className="hover:text-cyan transition-colors">API Docs</a>
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-bold text-white tracking-widest uppercase text-xs">Connect</span>
              <a href="#" className="hover:text-cyan transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-cyan transition-colors">Discord</a>
              <a href="#" className="hover:text-cyan transition-colors">Telegram</a>
              <a href="#" className="hover:text-cyan transition-colors">GitHub</a>
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
      </main>
    </div>
  );
}
