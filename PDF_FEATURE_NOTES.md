# PDF Upload Feature

## Overview
The Receipts app now supports PDF file uploads in addition to text-based formats (TXT, JSON, CSV). This enhancement allows users to upload conversation exports, screenshots, or any message thread documentation in PDF format for AI analysis.

## Features Added

### 1. **PDF Upload Support**
- Updated `UploadDropZone` component to accept `.pdf` files
- File input now accepts: `.txt, .json, .csv, .pdf`
- Visual indication of PDF support in the upload area

### 2. **PDF Viewer Component** (`/src/app/components/PDFViewer.tsx`)
- Full PDF document rendering using `react-pdf` library
- Page navigation (previous/next)
- Zoom controls (50% - 200%)
- Automatic text extraction from PDF pages
- Word count tracking for extracted content
- Text layer and annotation layer rendering
- Responsive design with glassmorphism styling

### 3. **Files Screen** (`/src/app/screens/FilesScreen.tsx`)
- Dedicated view for managing uploaded files
- File list with metadata (size, type)
- PDF preview pane
- File actions (view, delete)
- Quick upload button for new files

### 4. **File Info Banner** (`/src/app/components/FileInfoBanner.tsx`)
- Shows uploaded file information in Chat screen
- Displays file name, size, type, and extraction status
- Visual confirmation of "Ready for Analysis" state

### 5. **Uploaded File Card** (`/src/app/components/UploadedFileCard.tsx`)
- Reusable card component for file listings
- Shows file icon based on type (PDF vs Text)
- Quick actions: View and Delete

## Technical Implementation

### Dependencies
- `react-pdf`: ^10.4.1 - PDF rendering
- `pdfjs-dist`: ^5.5.207 - PDF.js worker for text extraction

### PDF Text Extraction
The PDFViewer component automatically extracts text from all pages of the uploaded PDF using PDF.js. This extracted text is:
- Available for AI analysis
- Counted for word statistics
- Passed to parent components via callback
- Stored in component state for processing

### Worker Configuration
PDF.js worker is loaded from CDN:
```javascript
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
```

## User Experience

### Upload Flow
1. User drags PDF or clicks to browse
2. File is validated (PDF, TXT, JSON, CSV)
3. Upload progress animation
4. File stored in app state
5. Automatic redirect to Chat screen
6. File info banner shows extraction status

### Files Screen Navigation
- Accessible via sidebar "Files" option
- Shows all uploaded files
- Click to preview PDFs with zoom/navigation controls
- Text extraction status displayed

### Design Consistency
- All components follow glassmorphism design system
- Neon yellow (#E6FF00) accents for active states
- Smooth micro-interactions (hover, focus, transitions)
- Backdrop blur effects (20px standard, 30px on hover)

## File Support Matrix

| Format | Upload | Preview | Text Extraction | Analysis Ready |
|--------|--------|---------|-----------------|----------------|
| PDF    | ✅     | ✅      | ✅              | ✅             |
| TXT    | ✅     | ⚠️*     | ✅              | ✅             |
| JSON   | ✅     | ⚠️*     | ✅              | ✅             |
| CSV    | ✅     | ⚠️*     | ✅              | ✅             |

*Text formats show preview placeholder - full implementation can be added later

## Future Enhancements
- Multiple file uploads
- File comparison view
- Advanced PDF features (annotations, highlights)
- Export analyzed data with PDF references
- OCR for scanned PDFs
- Batch processing of multiple PDFs
