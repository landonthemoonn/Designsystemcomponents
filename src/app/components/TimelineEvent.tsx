import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface TimelineEventProps {
  date: string;
  title: string;
  excerpt: string;
  tags: Array<{ label: string; highlight?: boolean }>;
  index: number;
}

export function TimelineEvent({ date, title, excerpt, tags, index }: TimelineEventProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Timeline line and marker */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-3 h-3 rounded-full bg-[#E6FF00] ring-4 ring-[#E6FF00]/20 z-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-[#E6FF00]/40 to-transparent absolute top-3" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-[16px] p-5 hover:bg-white/70 hover:backdrop-blur-[30px] transition-all duration-300">
          <p className="text-xs text-[#6B6B6B] mb-2">{date}</p>
          <h4 className="font-semibold text-[#111111] mb-2">{title}</h4>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{excerpt}</p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  tag.highlight
                    ? "bg-[#E6FF00] text-[#111111]"
                    : "bg-white/40 text-[#6B6B6B]"
                )}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
