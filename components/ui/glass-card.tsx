import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = true, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass transition-all duration-300",
        glow && "glass-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
