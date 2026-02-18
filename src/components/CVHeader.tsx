import { Mail, Phone } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

export function CVHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dietz Markus</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              - Shaper PST-VIII Reporting &amp; Analytics bei Shopfloor.Digital
            </p>
            <p className="text-sm text-muted-foreground">- Local Process Owner "OtD.00.05 – Data Analytics OtD"</p>
            <p className="text-sm text-muted-foreground">- GenAI-Multiplikator@TA-13 und SF.D</p>
            <p className="text-sm text-muted-foreground">- fundierter technischer Background</p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <img
              src={profileImage}
              alt="Markus Dietz"
              className="h-28 w-28 rounded-full object-cover border-2 border-border shadow-sm"
            />
            <div className="flex flex-col gap-1 items-center">
              <a
                href="mailto:Markus.M.Dietz@BMW.de"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" />
                Markus.M.Dietz@BMW.de
              </a>
              <a
                href="tel:+4915160196461"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" />
                0151 601 96461
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
