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
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative bg-white/60 backdrop-blur-[24px] border-2 border-dashed rounded-[32px] p-20 transition-all duration-700 ease-out",
          isDragging
            ? "border-[#E6FF00] bg-[#E6FF00]/10 scale-[1.02] shadow-2xl shadow-[#E6FF00]/20"
            : "border-white/40 hover:border-white/60 hover:bg-white/75 hover:backdrop-blur-[32px] hover:shadow-xl hover:shadow-black/5"
        )}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: isDragging ? 1.02 : 1.01 }}
      >
        <AnimatePresence mode="wait">
          {uploadComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <CheckCircle2 className="w-20 h-20 text-[#E6FF00] mx-auto mb-6" strokeWidth={2} />
              </motion.div>
              <h3 className="text-2xl tracking-tight text-[#111111] mb-3" style={{ fontWeight: 500, letterSpacing: '-0.02em' }}>Upload Complete</h3>
              <p className="text-[#6B6B6B] tracking-wide" style={{ letterSpacing: '0.02em' }}>Processing your messages...</p>
            </motion.div>
          ) : isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Upload className="w-20 h-20 text-[#E6FF00] mx-auto mb-6" strokeWidth={2} />
              </motion.div>
              <h3 className="text-2xl tracking-tight text-[#111111] mb-6" style={{ fontWeight: 500, letterSpacing: '-0.02em' }}>Uploading</h3>
              <div className="w-full max-w-md mx-auto bg-white/40 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-[#E6FF00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-[#6B6B6B] mt-3 tracking-wide" style={{ letterSpacing: '0.05em' }}>{uploadProgress}%</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                animate={isDragging ? { scale: 1.15, y: -8 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <FileText className="w-20 h-20 text-[#6B6B6B] mx-auto mb-6" strokeWidth={1.5} />
              </motion.div>
              
              <h3 className="text-2xl tracking-tight text-[#111111] mb-3" style={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
                Drop your PDF or message file here
              </h3>
              <p className="text-[#6B6B6B] mb-8 tracking-wide" style={{ letterSpacing: '0.02em' }}>or click to browse</p>

              <label className="inline-block group">
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.json,.csv,.pdf"
                  onChange={handleFileSelect}
                />
                <motion.span 
                  className="inline-block px-10 py-4 bg-[#E6FF00] text-[#111111] rounded-[20px] cursor-pointer shadow-lg shadow-[#E6FF00]/20 transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-4 tracking-wide"
                  style={{ fontWeight: 500, letterSpacing: '0.02em' }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(230, 255, 0, 0.3)',
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Import Messages
                </motion.span>
              </label>

              <div className="mt-12 flex flex-col items-center gap-4 text-sm text-[#6B6B6B]">
                <span className="tracking-wide" style={{ letterSpacing: '0.05em' }}>SUPPORTED FORMATS</span>
                <div className="flex gap-3">
                  <motion.span 
                    className="px-4 py-2 bg-white/40 rounded-full backdrop-blur-sm tracking-wide" 
                    style={{ letterSpacing: '0.02em' }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', transition: { duration: 0.3 } }}
                  >
                    PDF
                  </motion.span>
                  <motion.span 
                    className="px-4 py-2 bg-white/40 rounded-full backdrop-blur-sm tracking-wide" 
                    style={{ letterSpacing: '0.02em' }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', transition: { duration: 0.3 } }}
                  >
                    iMessage
                  </motion.span>
                  <motion.span 
                    className="px-4 py-2 bg-white/40 rounded-full backdrop-blur-sm tracking-wide" 
                    style={{ letterSpacing: '0.02em' }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', transition: { duration: 0.3 } }}
                  >
                    WhatsApp
                  </motion.span>
                  <motion.span 
                    className="px-4 py-2 bg-white/40 rounded-full backdrop-blur-sm tracking-wide" 
                    style={{ letterSpacing: '0.02em' }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', transition: { duration: 0.3 } }}
                  >
                    SMS Export
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on drag */}
        {isDragging && (
          <motion.div
            className="absolute inset-0 rounded-[32px] bg-[#E6FF00]/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.15, opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </div>
  );
}
