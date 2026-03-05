import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  focusable?: boolean;
}

export function GlassCard({ children, className, hover = false, focusable = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-[20px] p-6",
        hover && "transition-all duration-300 hover:backdrop-blur-[30px] hover:bg-white/70",
        focusable && "focus-within:ring-2 focus-within:ring-[#E6FF00] focus-within:ring-offset-2",
        className
      )}
      initial={false}
    >
      {children}
    </motion.div>
  );
}
