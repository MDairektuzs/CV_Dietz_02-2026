import { useMemo } from "react";
import { CVEvent, EventCategory, formatDateRange, categoryLabels } from "@/data/events";
import { Briefcase, GraduationCap, Heart, Diamond, Calendar, Building2, MapPin } from "lucide-react";

interface HorizontalTimelineProps {
  events: CVEvent[];
  selectedEvent: CVEvent | null;
  onEventClick: (event: CVEvent | null) => void;
}

const categoryConfig: Record<EventCategory, { icon: typeof Briefcase; barClass: string; dotClass: string; subtleClass: string }> = {
  work: { icon: Briefcase, barClass: "bg-category-work", dotClass: "bg-category-work", subtleClass: "bg-category-work-subtle" },
  education: { icon: GraduationCap, barClass: "bg-category-education", dotClass: "bg-category-education", subtleClass: "bg-category-education-subtle" },
  private: { icon: Heart, barClass: "bg-category-private", dotClass: "bg-category-private", subtleClass: "bg-category-private-subtle" },
};

function parseDate(d: string): number {
  if (d.length === 7) {
    const [y, m] = d.split("-");
    return parseInt(y) + (parseInt(m) - 1) / 12;
  }
  const date = new Date(d);
  return date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365;
}

function getCurrentYear(): number {
  const now = new Date();
  return now.getFullYear() + now.getMonth() / 12;
}

interface PlacedEvent {
  event: CVEvent;
  start: number;
  end: number;
  lane: number;
}

function assignLanes(events: CVEvent[]): { placed: PlacedEvent[]; laneCount: number } {
  const currentYear = getCurrentYear();
  const rangeEvents = events.filter((e) => e.category !== "private" && !e.milestone);
  
  // Sort work events first so they get lane 0 priority, then education
  const sorted = [...rangeEvents].sort((a, b) => {
    const catOrder = (c: EventCategory) => c === "work" ? 0 : 1;
    const catDiff = catOrder(a.category) - catOrder(b.category);
    if (catDiff !== 0) return catDiff;
    return a.start_date.localeCompare(b.start_date);
  });

  const laneEnds: number[] = [];
  const placed: PlacedEvent[] = [];

  for (const event of sorted) {
    const start = parseDate(event.start_date);
    const end = event.end_date ? parseDate(event.end_date) : currentYear;
    const padding = 0.05;

    let lane = -1;
    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] + padding <= start) {
        lane = i;
        break;
      }
    }

    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(end);
    } else {
      laneEnds[lane] = end;
    }

    placed.push({ event, start, end, lane });
  }

  // Private milestones below all range lanes, staggered to avoid text overlap
  const milestones = events.filter((e) => e.category === "private" || e.milestone);
  const sortedMilestones = [...milestones].sort((a, b) => a.start_date.localeCompare(b.start_date));
  const baseLane = Math.max(laneEnds.length, 1);
  
  // Assign milestones to staggered lanes based on proximity
  const milestoneLaneEnds: number[] = [];
  const milestoneMinGap = 3; // minimum years gap before reusing a lane
  
  for (const event of sortedMilestones) {
    const start = parseDate(event.start_date);
    let lane = -1;
    for (let i = 0; i < milestoneLaneEnds.length; i++) {
      if (milestoneLaneEnds[i] + milestoneMinGap <= start) {
        lane = i;
        break;
      }
    }
    if (lane === -1) {
      lane = milestoneLaneEnds.length;
      milestoneLaneEnds.push(start);
    } else {
      milestoneLaneEnds[lane] = start;
    }
    placed.push({ event, start, end: start, lane: baseLane + lane });
  }

  const totalMilestoneLanes = milestoneLaneEnds.length;
  const totalLanes = totalMilestoneLanes > 0 ? baseLane + totalMilestoneLanes : Math.max(laneEnds.length, 1);
  return { placed, laneCount: totalLanes };
}

export function HorizontalTimeline({ events, selectedEvent, onEventClick }: HorizontalTimelineProps) {
  const { years, minYear, totalSpan, placed, laneCount } = useMemo(() => {
    const currentYear = getCurrentYear();
    let min = Infinity;
    let max = -Infinity;

    for (const e of events) {
      const s = parseDate(e.start_date);
      const end = e.end_date ? parseDate(e.end_date) : currentYear;
      if (s < min) min = s;
      if (end > max) max = end;
    }

    const minY = Math.floor(min);
    const maxY = Math.ceil(max);
    const yrs: number[] = [];
    for (let y = minY; y <= maxY; y++) yrs.push(y);

    const { placed, laneCount } = assignLanes(events);

    return { years: yrs, minYear: minY, totalSpan: maxY - minY, placed, laneCount };
  }, [events]);

  if (totalSpan === 0) return null;

  const laneHeight = 56;
  const timelineHeight = laneCount * laneHeight + 8;

  return (
    <div className="flex flex-col gap-0">
      {/* Timeline */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Year axis */}
          <div className="relative h-7 mb-1 border-b border-border">
            {years.map((year) => {
              const left = ((year - minYear) / totalSpan) * 100;
              return (
                <div key={year} className="absolute" style={{ left: `${left}%` }}>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium -translate-x-1/2 block">
                    {year}
                  </span>
                  <div className="absolute top-6 w-px bg-border" style={{ height: `${timelineHeight + 4}px` }} />
                </div>
              );
            })}
          </div>

          {/* Timeline area */}
          <div className="relative" style={{ height: `${timelineHeight}px` }}>
            {placed.map(({ event, start, end, lane }) => {
              const config = categoryConfig[event.category];
              const Icon = config.icon;
              const left = ((start - minYear) / totalSpan) * 100;
              const top = lane * laneHeight + 4;
              const isSelected = selectedEvent?.id === event.id;
              const isMilestone = event.category === "private" || event.milestone;

              if (isMilestone) {
                // Render as diamond milestone marker
                return (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(isSelected ? null : event)}
                    className={`absolute flex flex-col items-center cursor-pointer group transition-all ${isSelected ? "scale-110" : ""}`}
                    style={{ left: `${left}%`, top: `${top}px`, transform: "translateX(-50%)" }}
                    title={`${event.title}\n${formatDateRange(event.start_date, event.end_date)}`}
                  >
                    <div className={`h-5 w-5 rotate-45 rounded-sm ${config.barClass} ${isSelected ? "opacity-100 ring-2 ring-foreground/20" : "opacity-80"} group-hover:opacity-100 transition-all`} />
                    <span className="text-[8px] sm:text-[9px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap">
                      {event.title}
                    </span>
                  </button>
                );
              }

              const width = Math.max(((end - start) / totalSpan) * 100, 1.2);

              return (
                <button
                  key={event.id}
                  onClick={() => onEventClick(isSelected ? null : event)}
                  className={`absolute rounded ${config.barClass} ${isSelected ? "opacity-100 ring-2 ring-foreground/20 shadow-md" : "opacity-80"} hover:opacity-100 transition-all hover:shadow-md cursor-pointer flex flex-col justify-center px-2 overflow-hidden group`}
                  style={{ left: `${left}%`, width: `${width}%`, top: `${top}px`, height: `${laneHeight - 8}px` }}
                  title={`${event.title}\n${formatDateRange(event.start_date, event.end_date)}${event.organization ? `\n${event.organization}` : ""}`}
                >
                  <div className="flex items-center gap-1">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary-foreground" />
                    <span className="text-[10px] sm:text-xs font-semibold text-primary-foreground whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                      {event.title}
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-primary-foreground/70 whitespace-nowrap overflow-hidden text-ellipsis leading-tight pl-[18px]">
                    {event.organization || formatDateRange(event.start_date, event.end_date)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
            {(["work", "education", "private"] as EventCategory[]).map((cat) => {
              const config = categoryConfig[cat];
              const Icon = config.icon;
              const hasEvents = events.some((e) => e.category === cat);
              if (!hasEvents) return null;
              return (
                <div key={cat} className="flex items-center gap-1.5">
                  {cat === "private" ? (
                    <div className={`h-3 w-3 rotate-45 rounded-sm ${config.barClass} opacity-80`} />
                  ) : (
                    <div className={`h-3 w-3 rounded-sm ${config.barClass} opacity-80`} />
                  )}
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    {categoryLabels[cat]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inline detail panel */}
      {selectedEvent && (
        <div className="mt-6 animate-fade-in">
          <div className={`rounded-lg border border-border p-5 ${categoryConfig[selectedEvent.category].subtleClass}`}>
            <div className="flex flex-col gap-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${categoryConfig[selectedEvent.category].dotClass}`} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {categoryLabels[selectedEvent.category]}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground leading-snug">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button
                  onClick={() => onEventClick(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-xs shrink-0 mt-1"
                >
                  ✕
                </button>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  {formatDateRange(selectedEvent.start_date, selectedEvent.end_date)}
                </div>
                {selectedEvent.organization && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    {selectedEvent.organization}
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {selectedEvent.location}
                  </div>
                )}
              </div>

              {/* Summary */}
              <p className="text-sm leading-relaxed text-foreground/80">
                {selectedEvent.summary}
              </p>

              {/* Details */}
              {selectedEvent.details && (
                <ul className="list-none space-y-1.5 text-sm text-foreground/80">
                  {selectedEvent.details
                    .split(/\n+/)
                    .map((l) => l.trim())
                    .filter(Boolean)
                    .map((line, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-0.5 shrink-0">•</span>
                        <span>{line.replace(/^[-•·]\s*/, "")}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
