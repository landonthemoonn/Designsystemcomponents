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
        "bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-[24px] p-8",
        hover && "transition-all duration-700 ease-out hover:backdrop-blur-[32px] hover:bg-white/75 hover:border-white/60 hover:shadow-xl hover:shadow-black/5",
        focusable && "focus-within:ring-2 focus-within:ring-[#E6FF00] focus-within:ring-offset-4 transition-all duration-500",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for smooth, editorial feel
      }}
    >
      {children}
    </motion.div>
  );
}
