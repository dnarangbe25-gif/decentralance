"use client";

import React, { useState, use } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { StatusBadge, JobStatus } from "@/components/ui/status-badge";
import { BidItem } from "@/components/features/bid-item";
import { useToast } from "@/components/ui/toast";
import { submitBid, acceptBid } from "@/lib/stellar/actions";
import { 
  Briefcase, 
  Star, 
  Calendar, 
  Clock, 
  CircleDollarSign, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

// Mock Data
const MOCK_JOB = {
  id: "1",
  title: "Senior Soroban Smart Contract Dev",
  client: "GBH7...4X3Z",
  reputation: 98,
  description: `## Project Overview
We are looking for an experienced Rust developer to build a custom Escrow logic for our upcoming NFT marketplace on Stellar. 

### Key Responsibilities
- Implement multi-signature authorization for milestone releases.
- Integrate with Soroban-Token interface for custom asset handling.
- Conduct comprehensive unit testing for edge cases (underflows, unauthorized access).

### Requirements
- 2+ years of Rust experience.
- Deep understanding of Stellar's Soroban smart contract framework.
- Proven track record of delivering secure on-chain logic.`,
  budget: 15000,
  deadline: "4d 12h",
  category: "Dev",
  postedDate: "2h ago",
  bidCount: 8,
  status: "Open" as JobStatus,
  milestones: [
    { name: "Contract Architecture & Setup", amount: 3000, status: "Released" },
    { name: "Core Escrow Logic Implementation", amount: 7000, status: "Pending" },
    { name: "Audit & Final Deployment", amount: 5000, status: "Pending" }
  ],
  bids: [
    { id: "b1", freelancer: "GD2S...P9L1", amount: 14500, proposal: "I have built 5+ Soroban contracts and can deliver this within 10 days with full test coverage.", reputation: 95, timestamp: "1h ago" },
    { id: "b2", freelancer: "GA6T...K5M2", amount: 15000, proposal: "Rust expert here. I've worked on the Stellar SDK itself and can ensure top-tier security for your escrow.", reputation: 99, timestamp: "30m ago" }
  ],
  escrow: {
    funded: 15000,
    paid: 3000,
    status: "Active"
  }
};

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState<string>("");
  const [proposal, setProposal] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptingBidId, setAcceptingBidId] = useState<string | null>(null);

  // For demo: pretend we are the job owner
  const isOwner = true; 

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidAmount || !proposal) {
      toast("Please fill in all fields", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitBid(resolvedParams.id, Number(bidAmount), proposal);
      toast("Bid submitted successfully!", "success");
      setBidAmount("");
      setProposal("");
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    setAcceptingBidId(bidId);
    try {
      await acceptBid(resolvedParams.id, bidId);
      toast("Bid accepted! Escrow initialized.", "success");
    } catch (err: any) {
      toast("Failed to accept bid", "error");
    } finally {
      setAcceptingBidId(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-24">
      {/* Subtle Background Effects */}
      <div className="orb w-96 h-96 bg-cyan/5 top-[-10%] right-[-5%] opacity-30" />
      <div className="orb w-[500px] h-[500px] bg-violet/5 bottom-[-10%] left-[-5%] opacity-20" />

      <main className="container mx-auto px-6 pt-32">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan mb-12 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Job Board
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Job Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Hero Content */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap gap-3 mb-8">
                <StatusBadge status={MOCK_JOB.status} />
                <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {MOCK_JOB.category}
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl mb-10 font-syne tracking-tight leading-[1.1]">{MOCK_JOB.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 p-5 glass border-white/5 w-fit rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                    <Briefcase size={18} className="text-cyan" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Job Poster</span>
                    <span className="text-sm font-mono font-bold text-white/80">{MOCK_JOB.client}</span>
                  </div>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-violet/10 border border-violet/20 px-3 py-1 rounded-full">
                    <Star size={12} className="text-violet fill-violet" />
                    <span className="text-xs font-black text-violet">{MOCK_JOB.reputation}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Reputation</span>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="glass p-10 border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase size={80} />
              </div>
              <h3 className="text-2xl font-syne mb-8 border-b border-white/5 pb-6">Project Overview</h3>
              <div className="prose prose-invert max-w-none text-white/60 leading-relaxed text-lg space-y-6">
                {MOCK_JOB.description.split('\n').map((line, i) => {
                  if (line.startsWith('##')) return <h4 key={i} className="text-2xl font-bold text-white mt-10 mb-4 font-syne">{line.replace('## ', '')}</h4>;
                  if (line.startsWith('###')) return <h5 key={i} className="text-xl font-bold text-white/80 mt-8 mb-3">{line.replace('### ', '')}</h5>;
                  if (line.startsWith('-')) return <div key={i} className="flex gap-3 ml-2 text-white/50"><div className="w-1.5 h-1.5 rounded-full bg-cyan/40 mt-2.5 flex-shrink-0" />{line.replace('- ', '')}</div>;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </section>

            {/* Milestones */}
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h3 className="text-2xl font-syne mb-10 flex items-center gap-3">
                Milestone Progress <ChevronRight size={20} className="text-white/20" />
              </h3>
              <div className="space-y-6 pl-2">
                {MOCK_JOB.milestones.map((m, i) => (
                  <div key={i} className="flex gap-10">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                        m.status === "Released" 
                          ? "bg-cyan border-cyan text-navy shadow-[0_0_20px_rgba(0,229,255,0.3)]" 
                          : "border-white/10 text-white/20 bg-white/5"
                      }`}>
                        {m.status === "Released" ? <CheckCircle2 size={20} strokeWidth={3} /> : <span className="text-sm font-black">{i + 1}</span>}
                      </div>
                      {i < MOCK_JOB.milestones.length - 1 && (
                        <div className={`w-1 flex-1 my-3 rounded-full ${m.status === "Released" ? "bg-cyan/40" : "bg-white/5"}`} />
                      )}
                    </div>
                    <GlassCard className={`flex-1 p-6 border-white/5 transition-all ${m.status === "Released" ? "bg-cyan/[0.05] border-cyan/10" : "hover:border-white/10"}`}>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h4 className={`text-xl font-bold ${m.status === "Released" ? "text-cyan" : "text-white/80"}`}>{m.name}</h4>
                          <div className="flex items-center gap-2">
                            <CircleDollarSign size={14} className="text-white/30" />
                            <span className="text-sm font-mono text-white/40 tracking-wider font-bold">{m.amount.toLocaleString()} XLM</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl ${
                          m.status === "Released" ? "bg-cyan/20 text-cyan" : "bg-white/10 text-white/30"
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </section>

            {/* Bids List */}
            <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-2xl font-syne mb-2">Proposals ({MOCK_JOB.bidCount})</h3>
                  <p className="text-white/40 text-sm">Review incoming bids from verified freelancers.</p>
                </div>
                <div className="flex items-center gap-2 glass px-4 py-2 border-white/5 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Bidding</span>
                </div>
              </div>
              <div className="space-y-6">
                {MOCK_JOB.bids.map(bid => (
                  <BidItem 
                    key={bid.id} 
                    bid={bid} 
                    isOwner={isOwner} 
                    onAccept={handleAcceptBid}
                    isAccepting={acceptingBidId === bid.id}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-32 h-fit">
            {/* Submit Bid Card */}
            <GlassCard className="p-8 border-cyan/20 shadow-[0_0_60px_rgba(0,229,255,0.08)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan/10 blur-[40px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-syne mb-8 tracking-tight">Submit Your Bid</h3>
              <form onSubmit={handleSubmitBid} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">Bid Amount (XLM)</label>
                  <div className="relative group">
                    <CircleDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all font-mono text-xl font-bold text-white"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Detailed Proposal</label>
                    <span className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded-md">{proposal.length} / 500</span>
                  </div>
                  <textarea 
                    placeholder="Describe your expertise and how you'll approach this task..."
                    rows={8}
                    maxLength={500}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all text-base text-white/80 resize-none leading-relaxed"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/40 tracking-wider">REQUIRED STAKE</span>
                    <span className="text-xs font-black font-mono bg-white/10 px-2 py-1 rounded-md">100 LANCE</span>
                  </div>
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/40 tracking-wider">YOUR STAKE</span>
                    <div className="flex items-center gap-2 text-green-400">
                      <ShieldCheck size={16} />
                      <span className="text-sm font-black font-mono">500 LANCE</span>
                    </div>
                  </div>
                </div>

                <GlowButton type="submit" className="w-full py-5 text-lg font-bold group" isLoading={isSubmitting}>
                  Submit Proposal <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
              </form>
            </GlassCard>

            {/* Summary Card */}
            <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-8">Contract Summary</h4>
              <div className="space-y-6">
                {[
                  { label: "Est. Budget", val: `${MOCK_JOB.budget.toLocaleString()} XLM`, icon: <CircleDollarSign size={16} />, color: "text-cyan" },
                  { label: "Deadline", val: MOCK_JOB.deadline, icon: <Clock size={16} /> },
                  { label: "Posted On", val: MOCK_JOB.postedDate, icon: <Calendar size={16} /> },
                  { label: "Proposals", val: MOCK_JOB.bidCount, icon: <Briefcase size={16} /> }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-white/30">
                      <div className="p-2 rounded-lg bg-white/5">{item.icon}</div>
                      <span className="text-xs font-bold tracking-widest">{item.label}</span>
                    </div>
                    <span className={`text-sm font-black tracking-tight ${item.color || "text-white/80"}`}>{item.val}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Escrow Status Card */}
            <GlassCard className="p-8 border-violet/20 bg-gradient-to-br from-violet/[0.05] to-transparent shadow-2xl overflow-hidden relative">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet/10 blur-[40px] rounded-full pointer-events-none" />
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Escrow Logic</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-black text-green-500 tracking-widest uppercase">Secured</span>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-syne font-black text-white/90">{MOCK_JOB.escrow.status}</span>
                  <span className="text-sm font-mono text-white/40">{Math.round((MOCK_JOB.escrow.paid / MOCK_JOB.escrow.funded) * 100)}% COMPLETE</span>
                </div>
                
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan via-cyan to-violet rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,229,255,0.2)]" 
                      style={{ width: `${(MOCK_JOB.escrow.paid / MOCK_JOB.escrow.funded) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-wider pt-2">
                    <div className="flex flex-col">
                      <span className="text-white/20 uppercase font-bold mb-1">Total Paid</span>
                      <span className="text-cyan font-black text-xs">{MOCK_JOB.escrow.paid.toLocaleString()} XLM</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-white/20 uppercase font-bold mb-1">Total Funded</span>
                      <span className="text-white/60 font-black text-xs">{MOCK_JOB.escrow.funded.toLocaleString()} XLM</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
