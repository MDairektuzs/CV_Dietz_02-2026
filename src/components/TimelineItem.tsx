import { CVEvent, formatDateRange, categoryLabels } from "@/data/events";
import { Briefcase, GraduationCap, Heart } from "lucide-react";

interface TimelineItemProps {
  event: CVEvent;
  onClick: (event: CVEvent) => void;
}

const categoryConfig = {
  work: {
    icon: Briefcase,
    dotClass: "bg-category-work",
    lineClass: "border-category-work",
    labelClass: "category-work",
  },
  education: {
    icon: GraduationCap,
    dotClass: "bg-category-education",
    lineClass: "border-category-education",
    labelClass: "category-education",
  },
  private: {
    icon: Heart,
    dotClass: "bg-category-private",
    lineClass: "border-category-private",
    labelClass: "category-private",
  },
};

export function TimelineItem({ event, onClick }: TimelineItemProps) {
  const config = categoryConfig[event.category];
  const Icon = config.icon;

  return (
    <button
      onClick={() => onClick(event)}
      className="group relative flex w-full gap-4 py-4 text-left transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-3 -mx-3"
    >
      {/* Timeline dot */}
      <div className="relative flex flex-col items-center pt-1">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.dotClass} text-primary-foreground`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <span className={`text-xs font-medium ${config.labelClass}`}>
            {categoryLabels[event.category]}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDateRange(event.start_date, event.end_date)}
          {event.organization && ` · ${event.organization}`}
          {event.location && ` · ${event.location}`}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-1">
          {event.summary}
        </p>
      </div>
    </button>
  );
}
