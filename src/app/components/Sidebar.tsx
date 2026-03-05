import { MessageSquare, Clock, BarChart3, Settings, Upload, FileText } from "lucide-react";
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
    <div className="w-64 h-screen bg-white/40 backdrop-blur-[20px] border-r border-black/5 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-12">
        <h1 className="font-bold text-[#111111] text-xl">Receipts</h1>
        <p className="text-xs text-[#6B6B6B] mt-1">AI Message Analysis</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-[16px] transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-2",
                isActive
                  ? "bg-[#E6FF00] text-[#111111] shadow-lg"
                  : "text-[#6B6B6B] hover:bg-white/60 hover:text-[#111111]"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
