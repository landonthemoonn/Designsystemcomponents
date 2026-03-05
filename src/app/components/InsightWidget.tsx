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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard className="h-full" hover>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[#6B6B6B]">{icon}</div>
          <h3 className="font-semibold text-[#111111]">{title}</h3>
        </div>
        <div className="text-[#111111]">{children}</div>
      </GlassCard>
    </motion.div>
  );
}
