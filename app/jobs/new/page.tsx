"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { useToast } from "@/components/ui/toast";
import { createJob } from "@/lib/stellar/actions";
import { 
  ArrowLeft, 
  Briefcase, 
  CircleDollarSign, 
  Clock, 
  Layout, 
  FileText,
  ChevronRight,
  Zap,
  ShieldCheck
} from "lucide-react";

const CATEGORIES = ["Design", "Dev", "Writing", "Marketing", "Other"];

export default function PostJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Dev",
    budget: "",
    deadline: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.budget || !formData.description) {
      toast("Please fill in all required fields", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createJob({
        ...formData,
        budget: Number(formData.budget)
      });
      toast("Job posted successfully! Escrow initialized.", "success");
      router.push(`/jobs/${result.id}`);
    } catch (err: any) {
      toast(err.message || "Failed to post job", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-24">
      {/* Background Orbs */}
      <div className="orb w-96 h-96 bg-cyan/5 top-[-10%] right-[-5%] opacity-30" />
      <div className="orb w-[500px] h-[500px] bg-violet/5 bottom-[-10%] left-[-5%] opacity-20" />

      <main className="container mx-auto px-6 pt-32 max-w-4xl">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan mb-12 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Job Board
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-syne font-black tracking-tight mb-4">Post a New Job</h1>
          <p className="text-lg text-white/40 font-medium">Create a secure escrow-backed listing on the Stellar network.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Basic Info */}
          <GlassCard className="p-10 border-white/5 space-y-10">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold">Job Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">Job Title</label>
                <div className="relative group">
                  <Layout className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="e.g. Senior Soroban Smart Contract Dev"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">Category</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all text-white appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat} className="bg-navy">{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Section 2: Budget & Timeline */}
          <GlassCard className="p-10 border-white/5 space-y-10">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center text-violet">
                <CircleDollarSign size={20} />
              </div>
              <h3 className="text-xl font-bold">Budget & Timeline</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">Budget (XLM)</label>
                <div className="relative group">
                  <CircleDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all font-mono text-xl font-bold text-white"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">Est. Deadline</label>
                <div className="relative group">
                  <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="e.g. 2 weeks"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all text-white"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Section 3: Description */}
          <GlassCard className="p-10 border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center text-amber">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-bold">Job Description</h3>
            </div>

            <textarea 
              placeholder="Describe the project requirements, milestones, and expected deliverables..."
              rows={10}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all text-white/80 leading-relaxed resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </GlassCard>

          {/* Protocol Info & Submit */}
          <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
            <div className="flex-1 glass p-8 border-cyan/10 bg-cyan/[0.02] rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                <Zap size={40} className="text-cyan" />
              </div>
              <div className="flex items-center gap-3 text-cyan mb-2">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Escrow Protection</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Funds will be locked in a secure Soroban escrow contract and only released upon milestone approval.
              </p>
            </div>

            <GlowButton 
              type="submit" 
              className="w-full md:w-auto px-12 py-6 text-xl font-bold group" 
              isLoading={isSubmitting}
            >
              Initialize Job & Escrow <ChevronRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
          </div>
        </form>
      </main>
    </div>
  );
}
