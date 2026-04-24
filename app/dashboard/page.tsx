"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { StatCard } from "@/components/features/stat-card";
import { EventFeed } from "@/components/features/event-feed";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Briefcase, 
  Wallet, 
  LayoutDashboard, 
  CircleDollarSign, 
  Clock, 
  History, 
  ShieldCheck, 
  Star,
  ExternalLink,
  TrendingUp,
  Ban,
  CheckCircle2,
  Lock,
  Zap,
  Users,
  ArrowLeft
} from "lucide-react";

type Tab = "client" | "freelancer" | "wallet";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("client");
  const [stakeAmount, setStakeAmount] = useState("");

  const NavItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
        activeTab === id 
          ? "bg-cyan/10 border border-cyan/30 text-cyan shadow-[0_0_20px_rgba(0,229,255,0.1)]" 
          : "text-white/40 hover:text-white"
      }`}
    >
      <Icon size={18} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-32 selection:bg-cyan/30 selection:text-cyan">
      {/* Background Orbs */}
      <div className="orb w-96 h-96 bg-cyan/5 top-[-10%] left-[-5%] opacity-30" />
      <div className="orb w-[500px] h-[500px] bg-violet/5 bottom-[-10%] right-[-5%] opacity-20" />

      <main className="container mx-auto px-6 pt-32">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Dashboard Area */}
          <div className="flex-1 space-y-12">
            
            {/* Header & Desktop Tabs */}
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan mb-10 transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
              <div>
                <h1 className="text-4xl md:text-5xl font-syne font-black tracking-tight mb-3">Control Center</h1>
                <p className="text-lg text-white/40 font-medium">
                  Welcome back, <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">GD2...P9L1</span>
                </p>
              </div>
              <div className="hidden md:flex glass p-2 border-white/5 rounded-[2.5rem] shadow-xl">
                <NavItem id="client" icon={LayoutDashboard} label="My Jobs" />
                <NavItem id="freelancer" icon={Briefcase} label="My Work" />
                <NavItem id="wallet" icon={Wallet} label="LANCE Wallet" />
              </div>
            </div>

            {/* TAB 1: CLIENT VIEW */}
            {activeTab === "client" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  <StatCard label="Active Jobs" value={3} icon={TrendingUp} color="cyan" subtext="Hiring" />
                  <StatCard label="Total Escrowed" value="24.5K" icon={Lock} color="violet" subtext="XLM" />
                  <StatCard label="Completed" value={12} icon={CheckCircle2} color="green" />
                  <StatCard label="Disputed" value={0} icon={Ban} color="amber" />
                </div>

                <GlassCard className="p-8 border-white/5 shadow-2xl overflow-hidden relative">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-syne tracking-tight">Active Listings</h3>
                    <Link href="/jobs/new">
                      <GlowButton variant="secondary" className="px-4 py-2 text-xs">Post New Listing</GlowButton>
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20 border-b border-white/5">
                        <tr>
                          <th className="pb-8">Job Title</th>
                          <th className="pb-8">Hired Talent</th>
                          <th className="pb-8">Escrow Progress</th>
                          <th className="pb-8">Next Target</th>
                          <th className="pb-8 text-right">Control</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          { title: "Senior Soroban Dev", dev: "GA6T...K5M2", status: "80% Paid", next: "Final Audit", budget: "15,000" },
                          { title: "Web3 Brand Design", dev: "GD2S...P9L1", status: "Active", next: "Logo Set 1", budget: "4,500" },
                          { title: "Technical Writer", dev: "Pending", status: "0% Paid", next: "Bidding", budget: "2,000" },
                        ].map((job, i) => (
                          <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-8 font-bold text-lg text-white/90">{job.title}</td>
                            <td className="py-8 font-mono text-sm text-white/40">{job.dev}</td>
                            <td className="py-8">
                              <div className="flex items-center gap-4">
                                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-cyan transition-all duration-1000 shadow-[0_0_10px_rgba(0,229,255,0.5)]" style={{ width: job.status.includes('80%') ? '80%' : job.status.includes('Active') ? '25%' : '0%' }} />
                                </div>
                                <span className="text-[10px] font-black text-cyan uppercase tracking-widest">{job.status}</span>
                              </div>
                            </td>
                            <td className="py-8 text-sm text-white/60 font-medium">{job.next}</td>
                            <td className="py-8 text-right">
                              <Link href={`/jobs/${i + 1}`}>
                                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan/30 hover:text-cyan transition-all">
                                  <ExternalLink size={18} />
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* TAB 2: FREELANCER VIEW */}
            {activeTab === "freelancer" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  <StatCard label="Active Contracts" value={2} icon={Briefcase} color="cyan" />
                  <StatCard label="LANCE Staked" value="2,500" icon={ShieldCheck} color="violet" subtext="Tokens" />
                  <StatCard label="Reputation" value="99.2" icon={Star} color="amber" />
                  <StatCard label="Total Earned" value="128K" icon={CircleDollarSign} color="green" subtext="XLM" />
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-syne tracking-tight">Active Workspaces</h3>
                  {[
                    { title: "Stellar Horizon Integration", client: "GD3S...L0P8", progress: 40, payment: "3,200 XLM", milestone: "API Auth Module" },
                    { title: "NFT Marketplace Frontend", client: "GB6E...W1Y9", progress: 90, payment: "8,000 XLM", milestone: "Production Push" }
                  ].map((work, i) => (
                    <GlassCard key={i} className="p-10 border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 group hover:border-cyan/20 transition-all shadow-xl">
                      <div className="flex-1 space-y-6 w-full">
                        <div>
                          <h4 className="text-2xl font-bold mb-2 group-hover:text-cyan transition-colors">{work.title}</h4>
                          <div className="flex items-center gap-3 text-white/30 font-mono text-sm">
                            <Users size={14} /> Client: {work.client}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black tracking-[0.2em] uppercase text-white/30">
                            <span>Current: {work.milestone}</span>
                            <span className="text-cyan">{work.progress}% Complete</span>
                          </div>
                          <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
                            <div className="h-full bg-gradient-to-r from-cyan to-violet rounded-full shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-1000" style={{ width: `${work.progress}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                        <div className="text-center md:text-right">
                          <span className="text-[10px] uppercase font-black tracking-widest text-white/20 block mb-2">Pending Release</span>
                          <div className="text-3xl font-black text-white/90 font-syne">{work.payment}</div>
                        </div>
                        <GlowButton variant="secondary" className="w-full md:w-auto px-8 py-3 text-sm">Open Workspace</GlowButton>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="space-y-8">
                   <h3 className="text-2xl font-syne tracking-tight">Active Proposals</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "3D Illustration Hero", budget: "2,800 XLM", status: "Pending", date: "2h ago" },
                        { title: "Soroban Token Bridge", budget: "12,000 XLM", status: "Active", date: "1d ago" }
                      ].map((bid, i) => (
                        <div key={i} className="flex justify-between items-center p-6 rounded-3xl glass border-white/5 hover:bg-white/[0.03] transition-colors group">
                          <div className="flex items-center gap-5">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan/20 transition-colors">
                              <Clock size={20} className="text-white/20 group-hover:text-cyan transition-colors" />
                            </div>
                            <div>
                               <h5 className="font-bold text-base mb-1">{bid.title}</h5>
                               <div className="flex items-center gap-3">
                                 <span className="text-xs font-mono font-bold text-cyan">{bid.budget}</span>
                                 <div className="w-1 h-1 rounded-full bg-white/20" />
                                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{bid.date}</span>
                               </div>
                            </div>
                          </div>
                          <StatusBadge status={bid.status as any} />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* TAB 3: WALLET VIEW */}
            {activeTab === "wallet" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <GlassCard className="p-16 border-violet/20 bg-gradient-to-br from-violet/[0.05] via-transparent to-transparent flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none scale-150 rotate-12"><Wallet size={120} /></div>
                  <div className="w-24 h-24 rounded-[2rem] bg-violet/20 border border-violet/30 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(124,58,237,0.3)] group hover:scale-110 transition-transform cursor-pointer">
                    <Zap className="text-violet fill-violet" size={48} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-white/20 mb-3">LANCE PROTOCOL BALANCE</span>
                  <h2 className="text-7xl md:text-8xl font-syne font-black tracking-tighter mb-6 text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">4,850.00</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="glass px-5 py-2 border-white/10 rounded-full flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                       <span className="text-xs font-bold tracking-tight">Verified Staker</span>
                    </div>
                    <span className="text-sm font-black text-white/40 pt-2 font-mono">≈ $1,240.24 USD</span>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <GlassCard className="p-10 border-white/5 shadow-xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan/5 blur-3xl rounded-full" />
                    <h3 className="text-2xl font-syne mb-10 tracking-tight">Staking Controls</h3>
                    <div className="space-y-10">
                       <div className="flex justify-between items-end bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                         <div>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-2">STAKED CAPITAL</span>
                            <div className="text-4xl font-black text-cyan font-syne">2,500 <span className="text-lg opacity-40">LANCE</span></div>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-2">LOCK EXPIRY</span>
                            <div className="text-lg font-bold text-white/80 font-mono">24D 12H</div>
                         </div>
                       </div>
                       <div className="space-y-6">
                          <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-black text-sm">STAKE:</div>
                            <input 
                              type="number" 
                              placeholder="0.00"
                              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-20 pr-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all font-mono text-xl font-bold"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <GlowButton className="flex-1 py-5 text-lg">Stake Now</GlowButton>
                            <GlowButton variant="secondary" className="flex-1 py-5 text-lg">Unstake Tokens</GlowButton>
                          </div>
                       </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-10 border-white/5 shadow-xl">
                    <h3 className="text-2xl font-syne mb-10 tracking-tight">Financial History</h3>
                    <div className="space-y-8">
                      {[
                        { type: "Earnings", amount: "+8,000 XLM", date: "2d ago", status: "success" },
                        { type: "Protocol Stake", amount: "-1,000 LANCE", date: "5d ago", status: "error" },
                        { type: "Earnings", amount: "+2,400 XLM", date: "1w ago", status: "success" },
                        { type: "Security Slash", amount: "-50 LANCE", date: "1m ago", status: "error" }
                      ].map((tx, i) => (
                        <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-white/[0.02] p-2 -m-2 rounded-2xl transition-colors">
                          <div className="flex items-center gap-5">
                            <div className={`p-3 rounded-2xl border transition-all ${tx.status === 'success' ? 'bg-green-400/10 border-green-400/20 text-green-400 group-hover:bg-green-400/20' : 'bg-red-400/10 border-red-400/20 text-red-400 group-hover:bg-red-400/20'}`}>
                              {tx.status === 'success' ? <TrendingUp size={18} /> : <Ban size={18} />}
                            </div>
                            <div>
                               <h5 className="font-bold text-base mb-0.5 text-white/80">{tx.type}</h5>
                               <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{tx.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                             <span className={`font-mono text-lg font-black tracking-tighter ${tx.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</span>
                             <div className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all">
                                <ExternalLink size={14} className="text-white/40" />
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Real-time Feed */}
          <div className="hidden xl:block w-[400px] space-y-8 h-fit lg:sticky lg:top-32 animate-in fade-in slide-in-from-right-8 duration-1000">
            <EventFeed />
            
            <GlassCard className="p-8 border-cyan/10 bg-cyan/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                <Zap size={60} className="text-cyan" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan mb-4">Ecosystem Tip</h4>
              <p className="text-base text-white/60 leading-relaxed italic font-medium">
                "Stakers with over 5,000 LANCE are eligible for the <span className="text-cyan font-bold">Arbitrator Council</span>, earning a 1% commission on resolved platform disputes."
              </p>
            </GlassCard>

            <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Protocol Health</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40 font-bold">Network TPS</span>
                    <span className="text-xs font-mono font-bold text-green-400">1,240 / s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40 font-bold">Smart Contracts</span>
                    <span className="text-xs font-mono font-bold text-white/80">SOROBAN v22</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION (FIXED) */}
      <div className="md:hidden fixed bottom-8 left-6 right-6 z-[100] animate-in slide-in-from-bottom-12 duration-700">
        <GlassCard className="p-3 border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-between bg-navy/60 backdrop-blur-[40px]">
          {[
            { id: "client", icon: LayoutDashboard, label: "Client" },
            { id: "freelancer", icon: Briefcase, label: "Freelance" },
            { id: "wallet", icon: Wallet, label: "Wallet" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-[2rem] transition-all duration-500 ${
                activeTab === item.id 
                  ? "bg-cyan/10 text-cyan shadow-inner" 
                  : "text-white/20"
              }`}
            >
              <item.icon size={22} className={activeTab === item.id ? "animate-pulse" : ""} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
