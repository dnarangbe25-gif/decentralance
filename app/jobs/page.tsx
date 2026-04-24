"use client";

import React, { useState, useEffect } from "react";
import { JobCard, Job } from "@/components/features/job-card";
import { JobSkeleton } from "@/components/ui/glass-skeleton";
import { GlowButton } from "@/components/ui/glow-button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Search, 
  Plus, 
  SlidersHorizontal, 
  ChevronDown, 
  FilterX,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

const MOCK_JOBS: Job[] = [
  { id: "1", title: "Senior Soroban Smart Contract Dev", client: "GBH7...4X3Z", postedDate: "2h ago", category: "Dev", budget: 15000, deadline: "4d 12h", bidCount: 8, status: "Open" },
  { id: "2", title: "Web3 Brand Identity Design", client: "GCO2...R9Q1", postedDate: "5h ago", category: "Design", budget: 4500, deadline: "2d 0h", bidCount: 12, status: "Open" },
  { id: "3", title: "Marketplace Technical Writer", client: "GA5X...K2M4", postedDate: "1d ago", category: "Writing", budget: 2000, deadline: "1w 2d", bidCount: 4, status: "In Progress" },
  { id: "4", title: "Stellar Horizon Integration", client: "GD3S...L0P8", postedDate: "1d ago", category: "Dev", budget: 8000, deadline: "6h 30m", bidCount: 6, status: "Open" },
  { id: "5", title: "NFT Collection Landing Page", client: "GB6E...W1Y9", postedDate: "2d ago", category: "Dev", budget: 3200, deadline: "3d 8h", bidCount: 15, status: "Open" },
  { id: "6", title: "Crypto Newsletter Strategy", client: "GCV9...B5S2", postedDate: "2d ago", category: "Marketing", budget: 1500, deadline: "2w 0d", bidCount: 2, status: "Open" },
  { id: "7", title: "Rust Audit for Escrow Contract", client: "GDM1...H7N5", postedDate: "3d ago", category: "Dev", budget: 25000, deadline: "5d 0h", bidCount: 3, status: "Open" },
  { id: "8", title: "UX Audit for DEX Interface", client: "GAK4...J8R2", postedDate: "3d ago", category: "Design", budget: 5000, deadline: "1d 18h", bidCount: 9, status: "Open" },
  { id: "9", title: "Social Media Manager (Web3)", client: "GBR2...F4G1", postedDate: "4d ago", category: "Marketing", budget: 1200, deadline: "3w 4d", bidCount: 22, status: "Open" },
  { id: "10", title: "Whitepaper Translation (JP)", client: "GCL8...X2V9", postedDate: "5d ago", category: "Writing", budget: 3000, deadline: "1w 0d", bidCount: 5, status: "Completed" },
  { id: "11", title: "Custom Soroban Token Bridge", client: "GDE3...S9M1", postedDate: "1w ago", category: "Dev", budget: 12000, deadline: "2d 4h", bidCount: 7, status: "Open" },
  { id: "12", title: "3D Illustration for Hero Section", client: "GAW1...T5Y3", postedDate: "1w ago", category: "Design", budget: 2800, deadline: "12h 45m", bidCount: 11, status: "Open" },
];

const CATEGORIES = ["All", "Design", "Dev", "Writing", "Marketing", "Other"];

export default function JobBoard() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [budgetRange, setBudgetRange] = useState(30000);

  useEffect(() => {
    // Simulate initial loading sequence
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || job.category === category;
    const matchesBudget = job.budget <= budgetRange;
    return matchesSearch && matchesCategory && matchesBudget;
  }).sort((a, b) => {
    if (sortBy === "Budget: High-Low") return b.budget - a.budget;
    return 0; // Default: Newest (matches mock order)
  });

  return (
    <main className="container mx-auto px-6 py-12 pt-32 min-h-screen">
      {/* Background Orbs (Reuse from landing but subtle) */}
      <div className="orb w-96 h-96 bg-cyan/5 top-[-10%] right-[-5%] opacity-30" />

      {/* Header */}
      <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan mb-10 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl md:text-6xl mb-3 tracking-tight font-syne">Browse Jobs</h1>
          <p className="text-lg text-white/40 font-medium">Discover 100+ opportunities in the Stellar ecosystem.</p>
        </div>
        <GlowButton className="px-8 py-3.5">
          <Plus size={20} className="mr-1" /> Post a Job
        </GlowButton>
      </div>

      {/* Filters & Search Section */}
      <GlassCard className="p-6 mb-16 shadow-2xl">
        <div className="flex flex-col gap-8">
          {/* Top Row: Search & Category Filter */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={22} />
              <input 
                type="text" 
                placeholder="Search jobs by title, skills, or client..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan/30 focus:bg-white/[0.08] transition-all text-white placeholder:text-white/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all duration-300 ${
                    category === cat 
                      ? "bg-cyan/10 border-cyan/40 text-cyan shadow-[0_0_20px_rgba(0,229,255,0.15)]" 
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Range Slider & Sort Dropdown */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-8 w-full md:w-auto">
              <div className="flex items-center gap-3 text-white/40 text-sm font-bold uppercase tracking-widest">
                <SlidersHorizontal size={18} />
                <span>Budget Limit</span>
              </div>
              <div className="flex-1 md:w-80 flex items-center gap-6">
                <input 
                  type="range" 
                  min="500" 
                  max="30000" 
                  step="500"
                  className="flex-1 accent-cyan cursor-pointer h-1.5 rounded-full"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(Number(e.target.value))}
                />
                <span className="text-cyan font-bold font-mono text-lg min-w-[120px] text-right bg-cyan/5 px-3 py-1 rounded-lg border border-cyan/10">
                  {budgetRange.toLocaleString()} XLM
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-sm font-bold text-white/30 uppercase tracking-widest">Sort:</span>
              <button 
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold hover:border-white/20 transition-all text-white/80"
                onClick={() => setSortBy(sortBy === "Newest" ? "Budget: High-Low" : "Newest")}
              >
                {sortBy} <ChevronDown size={16} className="text-white/20" />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array(6).fill(0).map((_, i) => <JobSkeleton key={i} />)}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-40 flex flex-col items-center text-center max-w-lg mx-auto animate-in zoom-in-95 duration-500">
          <div className="w-32 h-32 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-10 text-white/10 shadow-inner">
            <FilterX size={64} strokeWidth={1} />
          </div>
          <h3 className="text-3xl mb-4 font-syne tracking-tight">No active jobs found</h3>
          <p className="text-white/40 text-lg mb-12 leading-relaxed">
            Try broadening your filters or adjusting the budget slider to discover more opportunities.
          </p>
          <GlowButton variant="secondary" className="px-10 py-4" onClick={() => {
            setSearch("");
            setCategory("All");
            setBudgetRange(30000);
          }}>
            Reset All Filters
          </GlowButton>
        </div>
      )}
    </main>
  );
}
