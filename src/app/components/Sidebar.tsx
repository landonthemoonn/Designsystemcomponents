import { MessageSquare, Clock, BarChart3, Settings, Upload, FileText } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "files", label: "Files", icon: FileText },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-72 h-screen bg-white/40 backdrop-blur-[24px] border-r border-black/5 p-8 flex flex-col">
      {/* Logo */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-2xl tracking-tight text-[#111111] mb-2" style={{ fontWeight: 500, letterSpacing: '-0.02em' }}>Receipts</h1>
        <p className="text-sm text-[#6B6B6B] tracking-wide" style={{ letterSpacing: '0.05em' }}>AI MESSAGE ANALYSIS</p>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                x: 4,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-[20px] transition-all duration-500 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-4",
                isActive
                  ? "bg-[#E6FF00] text-[#111111] shadow-2xl shadow-[#E6FF00]/20"
                  : "text-[#6B6B6B] hover:bg-white/70 hover:text-[#111111] hover:shadow-lg hover:shadow-black/5"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="tracking-wide" style={{ fontWeight: isActive ? 500 : 400, letterSpacing: '0.01em' }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
