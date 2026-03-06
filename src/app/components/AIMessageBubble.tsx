import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface AIMessageBubbleProps {
  content: string;
  citations?: Array<{ text: string; sender: string; date: string }>;
}

export function AIMessageBubble({ content, citations }: AIMessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="max-w-4xl"
    >
      <GlassCard className="relative p-8" hover>
        <div className="flex items-start gap-4 mb-4">
          <motion.div 
            className="w-10 h-10 rounded-full bg-[#E6FF00] flex items-center justify-center shadow-lg shadow-[#E6FF00]/30"
            animate={{ 
              boxShadow: [
                '0 4px 12px rgba(230, 255, 0, 0.3)',
                '0 8px 20px rgba(230, 255, 0, 0.5)',
                '0 4px 12px rgba(230, 255, 0, 0.3)'
              ]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-5 h-5 text-[#111111]" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.3,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <p className="text-[#111111] leading-relaxed tracking-wide" style={{ lineHeight: '1.8', letterSpacing: '0.01em' }}>
              {content}
            </p>
          </motion.div>
        </div>

        {citations && citations.length > 0 && (
          <motion.div 
            className="mt-6 pt-6 border-t border-black/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xs text-[#6B6B6B] mb-4 tracking-wider" style={{ letterSpacing: '0.08em' }}>
              REFERENCED MESSAGES
            </p>
            <div className="space-y-3">
              {citations.map((citation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    x: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    transition: { duration: 0.4 }
                  }}
                  className="bg-white/40 rounded-[16px] p-4 border border-white/40 transition-all duration-500"
                >
                  <p className="text-sm text-[#111111] mb-2 tracking-wide" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
                    {citation.text}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#6B6B6B] tracking-wide" style={{ letterSpacing: '0.02em' }}>
                    <span style={{ fontWeight: 500 }}>{citation.sender}</span>
                    <span>•</span>
                    <span>{citation.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  );
}
