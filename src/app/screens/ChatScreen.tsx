import { useState } from "react";
import { Send, Search } from "lucide-react";
import { motion } from "motion/react";
import { AIMessageBubble } from "../components/AIMessageBubble";
import { GlassCard } from "../components/GlassCard";
import { FileInfoBanner } from "../components/FileInfoBanner";

const examplePrompts = [
  "Who first mentioned moving out?",
  "When did the argument about keys happen?",
  "Show all mentions of drugs",
  "What were the main topics discussed last month?",
];

const mockMessages = [
  {
    content: "Based on your message history, Sarah first mentioned moving out on February 12, 2026 during a conversation about apartment hunting. She was discussing potential neighborhoods and suggested looking at places together.",
    citations: [
      {
        text: "Hey, I've been thinking... maybe we should start looking for a place together?",
        sender: "Sarah",
        date: "Feb 12, 2026",
      },
      {
        text: "I found some great apartments in Brooklyn that are within our budget",
        sender: "Sarah",
        date: "Feb 12, 2026",
      },
    ],
  },
];

interface ChatScreenProps {
  uploadedFile?: File | null;
  extractedWordCount?: number;
}

export function ChatScreen({ uploadedFile, extractedWordCount }: ChatScreenProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<typeof mockMessages>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, mockMessages[0]]);
      setIsLoading(false);
    }, 800);
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Search bar */}
      <div className="p-6 border-b border-black/5 bg-white/40 backdrop-blur-[20px]">
        <div className="max-w-4xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-[16px] text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <FileInfoBanner file={uploadedFile || null} extractedWordCount={extractedWordCount} />

          {messages.length === 0 && !isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-2xl">
                <h2 className="font-semibold text-[#111111] mb-6">
                  Ask your messages anything...
                </h2>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {examplePrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleExampleClick(prompt)}
                      className="bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-[16px] p-4 text-left text-sm text-[#6B6B6B] hover:bg-white/70 hover:backdrop-blur-[30px] hover:text-[#111111] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>

                <p className="text-sm text-[#6B6B6B]">
                  Your conversation history is ready. Ask me anything about your messages.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <AIMessageBubble key={index} {...message} />
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl"
                >
                  <div className="bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-[24px] p-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E6FF00] flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-[#111111]/30 border-t-[#111111] rounded-full"
                        />
                      </div>
                      <span className="text-[#6B6B6B]">Analyzing your messages...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="p-6 border-t border-black/5 bg-white/40 backdrop-blur-[20px]">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-0 overflow-hidden" focusable>
            <div className="flex items-end gap-3 p-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask your messages anything..."
                rows={1}
                className="flex-1 bg-transparent text-[#111111] placeholder:text-[#6B6B6B] resize-none focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex items-center justify-center bg-[#E6FF00] rounded-[12px] text-[#111111] hover:shadow-lg hover:shadow-[#E6FF00]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
