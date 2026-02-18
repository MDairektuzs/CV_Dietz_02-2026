import { CVEvent, formatDateRange, categoryLabels } from "@/data/events";
import { X, Briefcase, GraduationCap, Heart, MapPin, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface EventDetailProps {
  event: CVEvent | null;
  open: boolean;
  onClose: () => void;
}

const categoryIcons = {
  work: Briefcase,
  education: GraduationCap,
  private: Heart,
};

const categoryBgClasses = {
  work: "bg-category-work-subtle",
  education: "bg-category-education-subtle",
  private: "bg-category-private-subtle",
};

const categoryDotClasses = {
  work: "bg-category-work",
  education: "bg-category-education",
  private: "bg-category-private",
};

export function EventDetail({ event, open, onClose }: EventDetailProps) {
  const isMobile = useIsMobile();

  if (!event) return null;

  const Icon = categoryIcons[event.category];

  const content = (
    <div className="flex flex-col gap-6">
      {/* Category badge */}
      <div
        className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 ${categoryBgClasses[event.category]}`}
      >
        <div className={`h-2 w-2 rounded-full ${categoryDotClasses[event.category]}`} />
        <span className="text-xs font-medium text-foreground">{categoryLabels[event.category]}</span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-xl font-semibold leading-snug text-foreground">{event.title}</h2>

      {/* Meta */}
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" />
          {formatDateRange(event.start_date, event.end_date)}
        </div>
        {event.organization && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0" />
            {event.organization}
          </div>
        )}
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            {event.location}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Details */}
      <div className="text-sm leading-relaxed text-foreground/80">
        {event.summary && <p className="mb-3">{event.summary}</p>}

        {event.details && (
          <div className="space-y-1 whitespace-normal break-words">
            {event.details
              .split(/\n+/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line, i) => (
                <p
                  key={i}
                  className="m-0 flex items-start gap-2 whitespace-normal"
                  style={{ display: "flex", whiteSpace: "normal" }}
                >
                  <span className="mt-[3px] text-xs leading-none" style={{ display: "inline-block" }}>
                    •
                  </span>
                  <span className="whitespace-normal" style={{ display: "inline" }}>
                    {line.replace(/^[-•·]\s*/, "")}
                  </span>
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={isMobile ? "max-h-[85vh] rounded-t-2xl" : "w-[420px] sm:w-[420px]"}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{event.title}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto py-2">{content}</div>
      </SheetContent>
    </Sheet>
  );
}
