import { useState, useMemo } from "react";
import { CVHeader } from "@/components/CVHeader";
import { FilterBar } from "@/components/FilterBar";
import { HorizontalTimeline } from "@/components/HorizontalTimeline";
import { EventDetail } from "@/components/EventDetail";
import { events, CVEvent, EventCategory } from "@/data/events";

const Index = () => {
  const [visibleCategories, setVisibleCategories] = useState<EventCategory[]>(["work", "education"]);
  const [showPrivate, setShowPrivate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CVEvent | null>(null);

  const toggleCategory = (cat: EventCategory) => {
    if (cat === "private") return;
    setVisibleCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleTogglePrivate = (val: boolean) => {
    setShowPrivate(val);
    if (val) {
      setVisibleCategories((prev) =>
        prev.includes("private") ? prev : [...prev, "private"]
      );
    } else {
      setVisibleCategories((prev) => prev.filter((c) => c !== "private"));
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (!visibleCategories.includes(e.category)) return false;
      if (e.category === "private" && !showPrivate) return false;
      return true;
    });
  }, [visibleCategories, showPrivate]);

  return (
    <div className="min-h-screen bg-background">
      <CVHeader />
      <FilterBar
        visibleCategories={visibleCategories}
        showPrivate={showPrivate}
        onToggleCategory={toggleCategory}
        onTogglePrivate={handleTogglePrivate}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Keine Ereignisse für die gewählten Filter.
          </p>
        ) : (
          <HorizontalTimeline
            events={filteredEvents}
            selectedEvent={selectedEvent}
            onEventClick={setSelectedEvent}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
