import { FileText, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";

interface FileInfoBannerProps {
  file: File | null;
  extractedWordCount?: number;
}

export function FileInfoBanner({ file, extractedWordCount }: FileInfoBannerProps) {
  if (!file) return null;

  const isPDF = file.type === "application/pdf" || file.name.endsWith(".pdf");
  const fileSize = (file.size / 1024 / 1024).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <GlassCard className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-[#E6FF00]/20 rounded-[12px]">
            <FileText className="w-5 h-5 text-[#E6FF00]" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-[#111111]">{file.name}</h4>
              <CheckCircle2 className="w-4 h-4 text-[#E6FF00]" />
            </div>
            <p className="text-sm text-[#6B6B6B]">
              {fileSize} MB • {isPDF ? "PDF Document" : "Text File"}
              {extractedWordCount && ` • ${extractedWordCount.toLocaleString()} words extracted`}
            </p>
          </div>

          <div className="px-3 py-1 bg-[#E6FF00]/10 rounded-full">
            <span className="text-xs font-medium text-[#E6FF00]">Ready for Analysis</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
