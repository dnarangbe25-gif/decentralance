"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { 
  CircleDollarSign, 
  Star, 
  Clock, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";

interface BidItemProps {
  bid: {
    id: string;
    freelancer: string;
    amount: number;
    proposal: string;
    reputation: number;
    timestamp: string;
  };
  isOwner: boolean;
  onAccept: (id: string) => void;
  isAccepting: boolean;
}

export function BidItem({ bid, isOwner, onAccept, isAccepting }: BidItemProps) {
  return (
    <GlassCard className="p-6 border-white/5 hover:border-white/10 transition-colors">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          {/* Freelancer Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan/20 to-violet/20 border border-white/10 flex items-center justify-center font-bold text-cyan text-sm">
              {bid.freelancer[2]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-white font-bold">
                  {bid.freelancer.slice(0, 8)}...{bid.freelancer.slice(-6)}
                </span>
                <div className="flex items-center gap-1 bg-cyan/10 border border-cyan/20 px-2 py-0.5 rounded-full">
                  <Star size={10} className="text-cyan fill-cyan" />
                  <span className="text-[10px] font-bold text-cyan">{bid.reputation}</span>
                </div>
              </div>
              <span className="text-[10px] text-white/30 flex items-center gap-1 mt-0.5">
                <Clock size={10} /> {bid.timestamp}
              </span>
            </div>
          </div>

          {/* Proposal Snippet */}
          <p className="text-sm text-white/60 leading-relaxed italic border-l-2 border-white/10 pl-4 py-1">
            "{bid.proposal}"
          </p>
        </div>

        {/* Bid Stats & Action */}
        <div className="flex flex-col md:items-end justify-between gap-4 md:min-w-[150px]">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Bid Amount</span>
            <div className="flex items-center md:justify-end gap-2 text-cyan">
              <CircleDollarSign size={18} />
              <span className="text-xl font-bold font-syne">{bid.amount.toLocaleString()} XLM</span>
            </div>
          </div>

          {isOwner && (
            <GlowButton 
              className="w-full md:w-auto px-6 py-2.5 text-sm"
              onClick={() => onAccept(bid.id)}
              isLoading={isAccepting}
            >
              <CheckCircle2 size={16} className="mr-2" /> Accept Bid
            </GlowButton>
          )}
          
          {!isOwner && (
            <div className="text-xs text-white/20 flex items-center gap-1 md:justify-end">
              <ExternalLink size={12} /> View Profile
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
