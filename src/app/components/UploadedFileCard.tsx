import { FileText, File as FileIcon, Eye, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";

interface UploadedFileCardProps {
  file: File;
  onView?: () => void;
  onDelete?: () => void;
}

export function UploadedFileCard({ file, onView, onDelete }: UploadedFileCardProps) {
  const isPDF = file.type === "application/pdf" || file.name.endsWith(".pdf");
  const fileSize = (file.size / 1024 / 1024).toFixed(2);

  return (
    <GlassCard className="p-4 hover:bg-white/70 hover:backdrop-blur-[30px] transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-[#E6FF00]/10 rounded-[12px]">
          {isPDF ? (
            <FileText className="w-6 h-6 text-[#E6FF00]" />
          ) : (
            <FileIcon className="w-6 h-6 text-[#E6FF00]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[#111111] truncate">{file.name}</h4>
          <p className="text-sm text-[#6B6B6B]">
            {fileSize} MB • {isPDF ? "PDF Document" : "Text File"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onView && (
            <motion.button
              onClick={onView}
              className="p-2 rounded-[12px] hover:bg-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 text-[#111111]" />
            </motion.button>
          )}
          {onDelete && (
            <motion.button
              onClick={onDelete}
              className="p-2 rounded-[12px] hover:bg-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </motion.button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
