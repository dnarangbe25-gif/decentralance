"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { StatusBadge, JobStatus } from "@/components/ui/status-badge";
import { 
  Users, 
  Calendar, 
  Clock, 
  ExternalLink,
  CircleDollarSign
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface Job {
  id: string;
  title: string;
  client: string;
  postedDate: string;
  category: string;
  budget: number;
  deadline: string;
  bidCount: number;
  status: JobStatus;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard className="p-6 h-full flex flex-col group relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {job.category}
            </span>
            <h3 className="text-xl font-syne font-bold leading-tight group-hover:text-cyan transition-colors">
              {job.title}
            </h3>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan/50" />
          </div>
          <span className="text-xs font-mono text-white/40">
            {job.client.slice(0, 6)}...{job.client.slice(-4)}
          </span>
          <span className="text-[10px] text-white/20 ml-auto flex items-center gap-1">
            <Calendar size={10} /> {job.postedDate}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">Budget</span>
            <div className="flex items-center gap-1.5 text-cyan">
              <CircleDollarSign size={14} />
              <span className="font-bold">{job.budget.toLocaleString()} XLM</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">Ends In</span>
            <div className="flex items-center gap-1.5 text-violet">
              <Clock size={14} />
              <span className="font-bold">{job.deadline}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-white/40">
            <Users size={16} />
            <span className="text-sm font-bold">{job.bidCount} Bids</span>
          </div>
          <Link href={`/jobs/${job.id}`}>
            <GlowButton variant="secondary" className="px-4 py-2 text-sm">
              View Job <ExternalLink size={14} />
            </GlowButton>
          </Link>
        </div>

        {/* Background Glow on Group Hover */}
        <div className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </GlassCard>
    </motion.div>
  );
}
