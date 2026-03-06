import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./components/Sidebar";
import { UploadScreen } from "./screens/UploadScreen";
import { FilesScreen } from "./screens/FilesScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { TimelineScreen } from "./screens/TimelineScreen";
import { InsightScreen } from "./screens/InsightScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("upload");
  const [hasUploaded, setHasUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUploadComplete = (file: File) => {
    setHasUploaded(true);
    setUploadedFile(file);
    setCurrentView("chat");
  };

  const renderScreen = () => {
    if (!hasUploaded && currentView !== "upload") {
      return <UploadScreen onUploadComplete={handleUploadComplete} />;
    }

    switch (currentView) {
      case "upload":
        return <UploadScreen onUploadComplete={handleUploadComplete} />;
      case "files":
        return <FilesScreen uploadedFile={uploadedFile} onNewUpload={() => setCurrentView("upload")} />;
      case "chat":
        return <ChatScreen uploadedFile={uploadedFile} />;
      case "timeline":
        return <TimelineScreen />;
      case "insights":
        return <InsightScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <UploadScreen onUploadComplete={handleUploadComplete} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F6] overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
