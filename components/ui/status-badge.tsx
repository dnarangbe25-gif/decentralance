import React from "react";
import { cn } from "@/lib/utils";

export type JobStatus = "Open" | "In Progress" | "Disputed" | "Completed";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig: Record<JobStatus, string> = {
  "Open": "bg-cyan/10 text-cyan border-cyan/20",
  "In Progress": "bg-violet/10 text-violet border-violet/20",
  "Disputed": "bg-amber/10 text-amber border-amber/20",
  "Completed": "bg-green-500/10 text-green-400 border-green-500/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider",
        statusConfig[status],
        className
      )}
    >
      {status}
    </span>
  );
}
