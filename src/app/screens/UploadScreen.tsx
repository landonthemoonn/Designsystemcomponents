import { UploadDropZone } from "../components/UploadDropZone";
import { FileText, Search, TrendingUp, Clock } from "lucide-react";
import { GlassCard } from "../components/GlassCard";

interface UploadScreenProps {
  onUploadComplete: (file: File) => void;
}

export function UploadScreen({ onUploadComplete }: UploadScreenProps) {
  const handleFileUpload = (file: File) => {
    onUploadComplete(file);
  };

  return (
    <div className="flex-1 overflow-y-auto p-12">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-bold text-[#111111] mb-4">
            Import Your Message Threads
          </h1>
          <p className="text-[#6B6B6B] mb-8 max-w-2xl mx-auto">
            Upload your conversation history as PDF or text files to unlock powerful AI-driven insights. 
            Ask questions, explore timelines, and discover patterns in your messages.
          </p>
        </div>
        
        <UploadDropZone onUpload={handleFileUpload} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <GlassCard className="p-4 text-center">
            <FileText className="w-8 h-8 text-[#E6FF00] mx-auto mb-3" />
            <h3 className="font-medium text-[#111111] mb-1 text-sm">PDF Support</h3>
            <p className="text-xs text-[#6B6B6B]">
              Text extraction & analysis
            </p>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <Search className="w-8 h-8 text-[#E6FF00] mx-auto mb-3" />
            <h3 className="font-medium text-[#111111] mb-1 text-sm">AI Chat</h3>
            <p className="text-xs text-[#6B6B6B]">
              Ask anything about your data
            </p>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <Clock className="w-8 h-8 text-[#E6FF00] mx-auto mb-3" />
            <h3 className="font-medium text-[#111111] mb-1 text-sm">Timeline</h3>
            <p className="text-xs text-[#6B6B6B]">
              Visualize conversation flow
            </p>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-[#E6FF00] mx-auto mb-3" />
            <h3 className="font-medium text-[#111111] mb-1 text-sm">Insights</h3>
            <p className="text-xs text-[#6B6B6B]">
              Discover hidden patterns
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
