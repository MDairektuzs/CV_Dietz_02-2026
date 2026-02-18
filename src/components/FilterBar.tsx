import { EventCategory, categoryLabels } from "@/data/events";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  visibleCategories: EventCategory[];
  showPrivate: boolean;
  onToggleCategory: (cat: EventCategory) => void;
  onTogglePrivate: (val: boolean) => void;
}

const categoryColorClasses: Record<EventCategory, string> = {
  work: "data-[state=checked]:bg-category-work data-[state=checked]:border-category-work",
  education: "data-[state=checked]:bg-category-education data-[state=checked]:border-category-education",
  private: "data-[state=checked]:bg-category-private data-[state=checked]:border-category-private",
};

export function FilterBar({ visibleCategories, showPrivate, onToggleCategory, onTogglePrivate }: FilterBarProps) {
  return (
    <div className="no-print border-b border-border bg-card/50">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Checkbox
            id="filter-work"
            checked={visibleCategories.includes("work")}
            onCheckedChange={() => onToggleCategory("work")}
            className={categoryColorClasses.work}
          />
          <Label htmlFor="filter-work" className="cursor-pointer text-sm font-medium">
            {categoryLabels.work}
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="filter-education"
            checked={visibleCategories.includes("education")}
            onCheckedChange={() => onToggleCategory("education")}
            className={categoryColorClasses.education}
          />
          <Label htmlFor="filter-education" className="cursor-pointer text-sm font-medium">
            {categoryLabels.education}
          </Label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Switch
            id="filter-private"
            checked={showPrivate}
            onCheckedChange={onTogglePrivate}
          />
          <Label htmlFor="filter-private" className="cursor-pointer text-sm text-muted-foreground">
            Privat anzeigen
          </Label>
        </div>
      </div>
    </div>
  );
}
