import { useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface UploadDropZoneProps {
  onUpload: (file: File) => void;
}

export function UploadDropZone({ onUpload }: UploadDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          setTimeout(() => {
            onUpload(file);
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative bg-white/60 backdrop-blur-[20px] border-2 border-dashed rounded-[24px] p-16 transition-all duration-300",
          isDragging
            ? "border-[#E6FF00] bg-[#E6FF00]/10 scale-[1.02]"
            : "border-white/40 hover:border-white/60 hover:bg-white/70 hover:backdrop-blur-[30px]"
        )}
        whileHover={{ scale: isDragging ? 1.02 : 1 }}
      >
        <AnimatePresence mode="wait">
          {uploadComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-[#E6FF00] mx-auto mb-4" />
              <h3 className="font-semibold text-[#111111] mb-2">Upload Complete!</h3>
              <p className="text-[#6B6B6B]">Processing your messages...</p>
            </motion.div>
          ) : isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Upload className="w-16 h-16 text-[#E6FF00] mx-auto mb-4 animate-pulse" />
              <h3 className="font-semibold text-[#111111] mb-4">Uploading...</h3>
              <div className="w-full bg-white/40 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-[#E6FF00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-[#6B6B6B] mt-2">{uploadProgress}%</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FileText className="w-16 h-16 text-[#6B6B6B] mx-auto mb-4" />
              </motion.div>
              
              <h3 className="font-semibold text-[#111111] mb-2">
                Drop your PDF or message file here
              </h3>
              <p className="text-[#6B6B6B] mb-6">or click to browse</p>

              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.json,.csv,.pdf"
                  onChange={handleFileSelect}
                />
                <span className="inline-block px-8 py-3 bg-[#E6FF00] text-[#111111] rounded-[16px] font-medium cursor-pointer hover:shadow-lg hover:shadow-[#E6FF00]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-2">
                  Import Messages
                </span>
              </label>

              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-[#6B6B6B]">
                <span>Supported formats:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/40 rounded-full">PDF</span>
                  <span className="px-3 py-1 bg-white/40 rounded-full">iMessage</span>
                  <span className="px-3 py-1 bg-white/40 rounded-full">WhatsApp</span>
                  <span className="px-3 py-1 bg-white/40 rounded-full">SMS Export</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on drag */}
        {isDragging && (
          <motion.div
            className="absolute inset-0 rounded-[24px] bg-[#E6FF00]/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}
