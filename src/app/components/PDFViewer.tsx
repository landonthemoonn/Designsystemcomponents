import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
  onTextExtracted?: (text: string) => void;
}

export function PDFViewer({ file, onTextExtracted }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [extractedText, setExtractedText] = useState<string>("");

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  // Extract text from PDF when loaded
  useEffect(() => {
    if (!file) return;

    const extractText = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");
          fullText += pageText + "\n\n";
        }

        setExtractedText(fullText);
        if (onTextExtracted) {
          onTextExtracted(fullText);
        }
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    };

    extractText();
  }, [file, onTextExtracted]);

  if (!file) {
    return (
      <GlassCard className="p-12 text-center">
        <FileText className="w-16 h-16 text-[#6B6B6B] mx-auto mb-4" />
        <p className="text-[#6B6B6B]">No PDF loaded</p>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* PDF Controls */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 rounded-[12px] hover:bg-white/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
              whileHover={{ scale: pageNumber > 1 ? 1.05 : 1 }}
              whileTap={{ scale: pageNumber > 1 ? 0.95 : 1 }}
            >
              <ChevronLeft className="w-5 h-5 text-[#111111]" />
            </motion.button>
            
            <span className="text-[#111111] font-medium px-4">
              Page {pageNumber} of {numPages}
            </span>
            
            <motion.button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 rounded-[12px] hover:bg-white/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
              whileHover={{ scale: pageNumber < numPages ? 1.05 : 1 }}
              whileTap={{ scale: pageNumber < numPages ? 0.95 : 1 }}
            >
              <ChevronRight className="w-5 h-5 text-[#111111]" />
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="p-2 rounded-[12px] hover:bg-white/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
              whileHover={{ scale: scale > 0.5 ? 1.05 : 1 }}
              whileTap={{ scale: scale > 0.5 ? 0.95 : 1 }}
            >
              <ZoomOut className="w-5 h-5 text-[#111111]" />
            </motion.button>
            
            <span className="text-[#111111] font-medium px-4">
              {Math.round(scale * 100)}%
            </span>
            
            <motion.button
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className="p-2 rounded-[12px] hover:bg-white/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
              whileHover={{ scale: scale < 2.0 ? 1.05 : 1 }}
              whileTap={{ scale: scale < 2.0 ? 0.95 : 1 }}
            >
              <ZoomIn className="w-5 h-5 text-[#111111]" />
            </motion.button>
          </div>
        </div>
      </GlassCard>

      {/* PDF Document */}
      <GlassCard className="p-8 overflow-auto max-h-[calc(100vh-300px)]">
        <div className="flex justify-center">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col items-center"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg rounded-lg overflow-hidden"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </GlassCard>

      {/* Extracted Text Preview (Hidden but available for AI processing) */}
      {extractedText && (
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-[#E6FF00]" />
            <span className="text-sm font-medium text-[#111111]">
              Text Extracted ({extractedText.split(" ").length} words)
            </span>
          </div>
          <p className="text-xs text-[#6B6B6B]">
            Content ready for AI analysis
          </p>
        </GlassCard>
      )}
    </div>
  );
}
