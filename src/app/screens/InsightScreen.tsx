import { Users, TrendingUp, MessageCircle, Hash } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { InsightWidget } from "../components/InsightWidget";

const messageVolumeData = [
  { week: "Week 1", count: 45 },
  { week: "Week 2", count: 67 },
  { week: "Week 3", count: 52 },
  { week: "Week 4", count: 89 },
  { week: "Week 5", count: 71 },
];

const topTopics = [
  { topic: "Work & Projects", count: 156 },
  { topic: "Weekend Plans", count: 98 },
  { topic: "Apartment Search", count: 72 },
  { topic: "Family", count: 64 },
  { topic: "Health & Fitness", count: 43 },
];

export function InsightScreen() {
  return (
    <div className="flex-1 overflow-y-auto p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-bold text-[#111111] mb-3">Message Insights</h1>
          <p className="text-[#6B6B6B]">
            Analytics and patterns from your conversation history
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Most Active Speaker */}
          <InsightWidget
            title="Most Active Speaker"
            icon={<Users className="w-5 h-5" />}
            index={0}
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B6B6B]">Sarah</span>
                  <span className="font-semibold">524 messages</span>
                </div>
                <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E6FF00] w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B6B6B]">You</span>
                  <span className="font-semibold">482 messages</span>
                </div>
                <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6B6B6B] w-[58%]" />
                </div>
              </div>
            </div>
          </InsightWidget>

          {/* Emotional Tone */}
          <InsightWidget
            title="Emotional Tone"
            icon={<TrendingUp className="w-5 h-5" />}
            index={1}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B6B6B]">Positive</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B6B6B]">Neutral</span>
                <span className="font-semibold">24%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B6B6B]">Negative</span>
                <span className="font-semibold">8%</span>
              </div>
              <div className="mt-4 p-4 bg-[#E6FF00]/10 rounded-[12px] border border-[#E6FF00]/20">
                <p className="text-sm text-[#111111]">
                  Overall tone is <span className="font-semibold">very positive</span>
                </p>
              </div>
            </div>
          </InsightWidget>

          {/* Message Volume - spans 2 columns */}
          <div className="lg:col-span-1">
            <InsightWidget
              title="Message Volume"
              icon={<MessageCircle className="w-5 h-5" />}
              index={2}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={messageVolumeData}>
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#6B6B6B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6B6B6B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {messageVolumeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 3 ? "#E6FF00" : "rgba(107, 107, 107, 0.3)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </InsightWidget>
          </div>

          {/* Top Topics - spans 2 columns */}
          <div className="lg:col-span-2">
            <InsightWidget
              title="Top Topics Discussed"
              icon={<Hash className="w-5 h-5" />}
              index={3}
            >
              <div className="space-y-3">
                {topTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#6B6B6B]">{topic.topic}</span>
                      <span className="font-semibold">{topic.count} mentions</span>
                    </div>
                    <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6B6B6B] transition-all duration-500"
                        style={{
                          width: `${(topic.count / topTopics[0].count) * 100}%`,
                          backgroundColor: index === 0 ? "#E6FF00" : "rgba(107, 107, 107, 0.6)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </InsightWidget>
          </div>

          {/* Total Messages */}
          <InsightWidget
            title="Total Messages"
            icon={<MessageCircle className="w-5 h-5" />}
            index={4}
          >
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-[#111111] mb-2">1,006</div>
              <p className="text-sm text-[#6B6B6B]">messages analyzed</p>
            </div>
          </InsightWidget>
        </div>
      </div>
    </div>
  );
}
