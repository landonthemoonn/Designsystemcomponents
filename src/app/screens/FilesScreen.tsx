import { useState } from "react";
import { FileText, Upload as UploadIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PDFViewer } from "../components/PDFViewer";
import { UploadedFileCard } from "../components/UploadedFileCard";
import { GlassCard } from "../components/GlassCard";

interface FilesScreenProps {
  uploadedFile: File | null;
  onNewUpload?: () => void;
}

export function FilesScreen({ uploadedFile, onNewUpload }: FilesScreenProps) {
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");

  const isPDF = uploadedFile?.type === "application/pdf" || uploadedFile?.name.endsWith(".pdf");

  const handleTextExtracted = (text: string) => {
    setExtractedText(text);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-bold text-[#111111] mb-2">Uploaded Files</h1>
          <p className="text-[#6B6B6B]">
            View and manage your uploaded conversation files
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File List */}
          <div className="lg:col-span-1 space-y-4">
            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[#111111]">Files</h2>
                {onNewUpload && (
                  <motion.button
                    onClick={onNewUpload}
                    className="p-2 rounded-[12px] hover:bg-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UploadIcon className="w-4 h-4 text-[#111111]" />
                  </motion.button>
                )}
              </div>

              {uploadedFile ? (
                <UploadedFileCard
                  file={uploadedFile}
                  onView={() => setViewingFile(uploadedFile)}
                />
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-[#6B6B6B] mx-auto mb-3" />
                  <p className="text-[#6B6B6B] text-sm">No files uploaded yet</p>
                </div>
              )}
            </GlassCard>
          </div>

          {/* File Viewer */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {viewingFile && isPDF ? (
                <motion.div
                  key="pdf-viewer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <PDFViewer
                    file={viewingFile}
                    onTextExtracted={handleTextExtracted}
                  />
                </motion.div>
              ) : viewingFile ? (
                <motion.div
                  key="text-viewer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-6">
                    <h3 className="font-semibold text-[#111111] mb-4">
                      {viewingFile.name}
                    </h3>
                    <div className="bg-white/40 backdrop-blur-[10px] rounded-[12px] p-4 max-h-[600px] overflow-y-auto">
                      <pre className="text-sm text-[#111111] whitespace-pre-wrap font-mono">
                        {/* File content would be loaded here */}
                        Content preview available after processing...
                      </pre>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GlassCard className="p-12 text-center h-full min-h-[400px] flex items-center justify-center">
                    <div>
                      <FileText className="w-16 h-16 text-[#6B6B6B] mx-auto mb-4" />
                      <h3 className="font-semibold text-[#111111] mb-2">
                        No file selected
                      </h3>
                      <p className="text-[#6B6B6B]">
                        Select a file to view its contents
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
