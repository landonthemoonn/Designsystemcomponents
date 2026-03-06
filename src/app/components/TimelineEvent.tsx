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
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative flex gap-8"
    >
      {/* Timeline line and marker */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-[#E6FF00] ring-4 ring-[#E6FF00]/20 z-10 shadow-lg shadow-[#E6FF00]/30"
          animate={{ 
            scale: [1, 1.15, 1],
            boxShadow: [
              '0 4px 12px rgba(230, 255, 0, 0.3)',
              '0 8px 20px rgba(230, 255, 0, 0.5)',
              '0 4px 12px rgba(230, 255, 0, 0.3)'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: index * 0.4,
            ease: "easeInOut"
          }}
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-[#E6FF00]/40 to-transparent absolute top-4" />
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 pb-12"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="bg-white/60 backdrop-blur-[24px] border border-white/40 rounded-[24px] p-7 hover:bg-white/75 hover:backdrop-blur-[32px] hover:shadow-xl hover:shadow-black/5 hover:border-white/60 transition-all duration-700 ease-out"
          whileHover={{ scale: 1.01 }}
        >
          <p className="text-xs text-[#6B6B6B] mb-3 tracking-wider" style={{ letterSpacing: '0.08em' }}>
            {date.toUpperCase()}
          </p>
          <h4 className="text-xl text-[#111111] mb-3 tracking-tight" style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>
            {title}
          </h4>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4 tracking-wide" style={{ lineHeight: '1.7', letterSpacing: '0.01em' }}>
            {excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.12 + i * 0.05, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs tracking-wide",
                  tag.highlight
                    ? "bg-[#E6FF00] text-[#111111] shadow-lg shadow-[#E6FF00]/20"
                    : "bg-white/40 text-[#6B6B6B]"
                )}
                style={{ 
                  fontWeight: tag.highlight ? 500 : 400,
                  letterSpacing: '0.05em'
                }}
              >
                {tag.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
