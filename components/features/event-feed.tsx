"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  CircleDollarSign, 
  UserPlus, 
  Briefcase, 
  Zap,
  ArrowRight
} from "lucide-react";

interface Event {
  id: string;
  type: "payment" | "bid" | "job" | "system";
  message: string;
  time: string;
}

const INITIAL_EVENTS: Event[] = [
  { id: "1", type: "payment", message: "Job #42 milestone released", time: "2m ago" },
  { id: "2", type: "bid", message: "New bid on your contract", time: "15m ago" },
  { id: "3", type: "job", message: "Job 'Rust Audit' was completed", time: "1h ago" },
];

const MOCK_MESSAGES = [
  "New proposal from GA...4X",
  "Milestone #2 funded for Project X",
  "Reputation score increased by +5",
  "LANCE stake lock-period expired",
  "System: Maintenance at 04:00 UTC",
  "Payment of 2,500 XLM released",
];

export function EventFeed() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: Event = {
        id: Math.random().toString(36).substring(7),
        type: "system",
        message: MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)],
        time: "Just now",
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "payment": return <CircleDollarSign size={14} className="text-cyan" />;
      case "bid": return <UserPlus size={14} className="text-violet" />;
      case "job": return <Briefcase size={14} className="text-amber" />;
      default: return <Zap size={14} className="text-white/40" />;
    }
  };

  return (
    <GlassCard className="p-6 h-fit border-white/5 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <Bell size={18} className="text-white/60" />
          </div>
          <h3 className="text-lg font-syne font-bold tracking-tight">On-Chain Activity</h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-cyan animate-pulse">Live</span>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors"
            >
              <div className="mt-1">{getIcon(event.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/80 leading-tight mb-1 truncate">{event.message}</p>
                <span className="text-[10px] text-white/20 font-mono">{event.time}</span>
              </div>
              <ArrowRight size={14} className="text-white/10 group-hover:text-cyan transition-colors" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">
          View Full History
        </button>
      </div>
    </GlassCard>
  );
}
