import { TimelineEvent } from "../components/TimelineEvent";

const timelineEvents = [
  {
    date: "March 1, 2026",
    title: "Plans for Weekend Trip",
    excerpt: "Discussion about visiting the mountains and booking accommodations for the upcoming weekend getaway.",
    tags: [
      { label: "Travel", highlight: true },
      { label: "Planning" },
    ],
  },
  {
    date: "February 28, 2026",
    title: "Work Project Deadline",
    excerpt: "Conversation about the Q1 project deadline and coordination on final deliverables.",
    tags: [
      { label: "Work" },
      { label: "Deadline", highlight: false },
    ],
  },
  {
    date: "February 25, 2026",
    title: "Conflict Resolution",
    excerpt: "Important discussion about resolving the misunderstanding from last week's conversation.",
    tags: [
      { label: "Conflict", highlight: true },
      { label: "Important" },
    ],
  },
  {
    date: "February 20, 2026",
    title: "Birthday Party Planning",
    excerpt: "Organizing surprise birthday party details, guest list, and venue selection.",
    tags: [
      { label: "Celebration" },
      { label: "Planning" },
    ],
  },
  {
    date: "February 15, 2026",
    title: "Promise to Call More Often",
    excerpt: "Commitment to stay in better touch and schedule regular weekly check-in calls.",
    tags: [
      { label: "Promise", highlight: true },
      { label: "Relationship" },
    ],
  },
  {
    date: "February 12, 2026",
    title: "Apartment Hunting Discussion",
    excerpt: "First mention of moving out and looking for apartments together in Brooklyn.",
    tags: [
      { label: "Moving" },
      { label: "Important", highlight: true },
    ],
  },
];

export function TimelineScreen() {
  return (
    <div className="flex-1 overflow-y-auto p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="font-bold text-[#111111] mb-3">Message Timeline</h1>
          <p className="text-[#6B6B6B]">
            Key events and moments extracted from your conversation history
          </p>
        </div>

        <div className="space-y-0">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
