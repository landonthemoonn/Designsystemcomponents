import { GlassCard } from "../components/GlassCard";
import { FileText, Trash2, Download, Shield } from "lucide-react";

export function SettingsScreen() {
  return (
    <div className="flex-1 overflow-y-auto p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="font-bold text-[#111111] mb-3">Settings</h1>
          <p className="text-[#6B6B6B]">
            Manage your data and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Data Management */}
          <GlassCard hover>
            <div className="flex items-start gap-4">
              <FileText className="w-5 h-5 text-[#6B6B6B] mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#111111] mb-2">Data Management</h3>
                <p className="text-sm text-[#6B6B6B] mb-4">
                  Your message data is stored locally in your browser. We don't send your conversations to any external servers. Supports PDF, TXT, JSON, and CSV formats.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white/60 border border-white/40 rounded-[12px] text-sm text-[#111111] hover:bg-white/80 transition-all focus:outline-none focus:ring-2 focus:ring-[#E6FF00]">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Data
                    </div>
                  </button>
                  <button className="px-4 py-2 bg-white/60 border border-white/40 rounded-[12px] text-sm text-[#6B6B6B] hover:text-red-600 hover:border-red-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#E6FF00]">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Clear All Data
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Privacy */}
          <GlassCard hover>
            <div className="flex items-start gap-4">
              <Shield className="w-5 h-5 text-[#6B6B6B] mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#111111] mb-2">Privacy & Security</h3>
                <p className="text-sm text-[#6B6B6B] mb-4">
                  All processing happens locally. Your conversations remain private and secure.
                </p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-white/40 bg-white/60 text-[#E6FF00] focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-2"
                    />
                    <span className="text-sm text-[#6B6B6B] group-hover:text-[#111111] transition-colors">
                      Enable AI analysis
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-white/40 bg-white/60 text-[#E6FF00] focus:ring-2 focus:ring-[#E6FF00] focus:ring-offset-2"
                    />
                    <span className="text-sm text-[#6B6B6B] group-hover:text-[#111111] transition-colors">
                      Generate timeline events
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* About */}
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="font-bold text-[#111111] mb-2">Receipts</h2>
              <p className="text-sm text-[#6B6B6B] mb-1">Version 1.0.0</p>
              <p className="text-xs text-[#6B6B6B]">AI-powered message analysis tool</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
