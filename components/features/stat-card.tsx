"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "cyan" | "violet" | "amber" | "green";
  subtext?: string;
}

const colorMap = {
  cyan: "text-cyan bg-cyan/10 border-cyan/20",
  violet: "text-violet bg-violet/10 border-violet/20",
  amber: "text-amber bg-amber/10 border-amber/20",
  green: "text-green-400 bg-green-400/10 border-green-400/20",
};

const glowMap = {
  cyan: "shadow-[0_0_20px_rgba(0,229,255,0.15)]",
  violet: "shadow-[0_0_20px_rgba(124,58,237,0.15)]",
  amber: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  green: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
};

export function StatCard({ label, value, icon: Icon, color, subtext }: StatCardProps) {
  return (
    <GlassCard className={`p-6 border-white/5 transition-all hover:scale-[1.02] hover:bg-white/[0.03] ${glowMap[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        {subtext && <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">{subtext}</span>}
      </div>
      <div className="space-y-1">
        <h4 className="text-3xl font-syne font-black tracking-tight">{value}</h4>
        <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">{label}</p>
      </div>
    </GlassCard>
  );
}
