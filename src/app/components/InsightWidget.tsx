import { ReactNode } from "react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";

interface InsightWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  index: number;
}

export function InsightWidget({ title, icon, children, index }: InsightWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <GlassCard className="h-full p-8" hover>
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: index * 0.15 + 0.2,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <motion.div 
            className="text-[#6B6B6B]"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.4 }
            }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl text-[#111111] tracking-tight" style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>
            {title}
          </h3>
        </motion.div>
        <motion.div 
          className="text-[#111111]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: index * 0.15 + 0.4,
            duration: 0.6
          }}
        >
          {children}
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
