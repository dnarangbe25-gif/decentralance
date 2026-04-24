"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
}

export function GlowButton({ 
  children, 
  className, 
  variant = "primary", 
  isLoading,
  disabled,
  ...props 
}: GlowButtonProps) {
  // Destructure to avoid Framer Motion / React 19 type conflicts on event handlers
  const { 
    onAnimationStart, 
    onDragStart, 
    onDragEnd, 
    onDrag, 
    ...motionProps 
  } = props as any;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group px-6 py-2.5 rounded-xl font-bold font-syne transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden",
        variant === "primary" 
          ? "bg-cyan text-navy shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]" 
          : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
        className
      )}
      disabled={disabled || isLoading}
      {...motionProps}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && (
          <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
        )}
        {children}
      </span>
      
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.button>
  );
}
