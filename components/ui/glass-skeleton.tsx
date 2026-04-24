import React from "react";
import { cn } from "@/lib/utils";

interface GlassSkeletonProps {
  className?: string;
}

export function GlassSkeleton({ className }: GlassSkeletonProps) {
  return (
    <div
      className={cn(
        "glass border-white/5 relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export function JobSkeleton() {
  return (
    <div className="p-6 glass border-white/5 space-y-4">
      <div className="flex justify-between items-start">
        <GlassSkeleton className="h-6 w-2/3 rounded-lg" />
        <GlassSkeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <GlassSkeleton className="h-4 w-1/2 rounded-md" />
        <GlassSkeleton className="h-4 w-1/3 rounded-md" />
      </div>
      <div className="pt-4 flex justify-between items-center">
        <div className="flex gap-4">
          <GlassSkeleton className="h-8 w-20 rounded-xl" />
          <GlassSkeleton className="h-8 w-20 rounded-xl" />
        </div>
        <GlassSkeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}
