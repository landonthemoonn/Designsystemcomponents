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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl"
    >
      <GlassCard className="relative" hover>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#E6FF00] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#111111]" />
          </div>
          <div className="flex-1">
            <p className="text-[#111111] leading-relaxed">{content}</p>
          </div>
        </div>

        {citations && citations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-black/5">
            <p className="text-xs text-[#6B6B6B] mb-3">Referenced messages:</p>
            <div className="space-y-2">
              {citations.map((citation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/40 rounded-[12px] p-3 border border-white/40"
                >
                  <p className="text-sm text-[#111111] mb-1">{citation.text}</p>
                  <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                    <span>{citation.sender}</span>
                    <span>•</span>
                    <span>{citation.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
