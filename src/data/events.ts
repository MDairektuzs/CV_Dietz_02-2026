export type EventCategory = "work" | "education" | "private";

export interface CVEvent {
  id: string;
  title: string;
  category: EventCategory;
  start_date: string;
  end_date: string | null;
  organization: string | null;
  location: string | null;
  summary: string;
  details?: string;
  private_default_hidden: boolean;
  milestone?: boolean;
  sort_order?: number;
}

export const events: CVEvent[] = [
  {
    id: "edu-2",
    title: "Ausbildung zum Fertigungsmechaniker",
    category: "work",
    start_date: "2009-09",
    end_date: "2012-01",
    organization: "PT-321 | Weiterbildung BMW Group, Produktion Werke",
    location: "München",
    summary: "Verkürzte Berufsausbildung zum Fertigungsmechaniker bei der BMW Group am Werk München.",
    details:
      "- Verkürzte Ausbildung zum Fertigungsmechaniker (2,5 Jahre statt regulär 3 Jahre)\n" +
      "- Fundierte praktische Erfahrung in Fertigungs- und Produktionsprozessen\n" +
      "- Früher Einstieg in die BMW Produktionswelt am Standort München",
    private_default_hidden: false,
  },
  {
    id: "edu-3",
    title: "Staatlich geprüfter Maschinenbautechniker",
    category: "education",
    start_date: "2015-05",
    end_date: "2018-11",
    organization: "DAA Technikum",
    location: null,
    summary:
      "Berufsbegleitende Weiterbildung zum staatlich geprüften Maschinenbautechniker mit Fachrichtung Konstruktion im Fernstudium.",
    details:
      "- Berufsbegleitendes Fernstudium am DAA Technikum\n" +
      "- Vertiefung in Konstruktion, Fertigungstechnik und Produktion\n" +
      "- Stärkung des technischen Fundamentes für spätere Digitalisierungsrollen\n" +
      "- Abschlussnote 1,6",
    private_default_hidden: false,
  },
  {
    id: "edu-4",
    title: "B.A. Digital Business (Data Science)",
    category: "education",
    start_date: "2020-08",
    end_date: "2023-07",
    organization: "IU | International University",
    location: null,
    summary: "Fernstudium Digital Business mit Schwerpunkt Data Science in Sprintvariante (6 statt 8 Semester).",
    details:
      "- Bachelorstudium Digital Business (Data Science) im Fernstudium an der IU\n" +
      "- Sprintvariante mit Abschluss in 6 statt 8 Semestern\n" +
      "- Fachrichtung Data Analytics\n" +
      "- Abschlussnote 1,5\n" +
      "- Vorbereitung auf datengetriebene Rollen im Umfeld Produktion & Digitalisierung",
    private_default_hidden: false,
  },
  {
    id: "edu-5",
    title: "Bachelorarbeit: Prompt Engineering",
    category: "education",
    start_date: "2023-07-01",
    end_date: null,
    organization: "IU | International University",
    location: null,
    summary: "Bachelorarbeit zu Text-to-Text Prompt Engineering for Generative AI im Studiengang Digital Business.",
    details:
      "- Bachelorarbeit zum Thema „Text-to-Text Prompt Engineering for Generative AI“\n" +
      "- Analyse und Systematisierung von Prompting-Strategien für Generative KI\n" +
      "- Grundlage für die Rolle als Ansprechpartner für Generative AI im Unternehmenskontext",
    private_default_hidden: false,
    milestone: true,
  },
  {
    id: "work-1",
    title: "Fachkraft Zerspanung",
    category: "work",
    start_date: "2012-02",
    end_date: "2018-06",
    organization: "TP-153 | Mechanische Fertigung",
    location: "W1.30 | WAB München",
    summary: "Fachkraft Zerspanung in der mechanischen Fertigung mit Fokus auf CNC-Bearbeitung komplexer Bauteile.",
    details:
      "- Programmierung und Bedienung von CNC-Maschinen mit TEBIS (CAD/CAM)\n" +
      "- Fertigung komplexer Bauteile auf Klein-, Mittel- und Großmaschinen\n" +
      "- Sicherstellung von Qualität, Maßhaltigkeit und Prozessstabilität für Individual- und Kleinserienfertigung\n" +
      "- Aufbau eines tiefen Verständnisses für Fertigungsprozesse und Shopfloor-Anforderungen\n" +
      "- Arbeiten an Schleif-, Dreh-, Bohr- und Fräsmaschinen sowie Laserschweißanlage",
    private_default_hidden: false,
  },
  {
    id: "work-2",
    title: "Fertigungsmittelkonstrukteur",
    category: "work",
    start_date: "2018-07",
    end_date: "2022-01",
    organization: "TP-152 | Konstruktion Werkzeuge München",
    location: "W1.30 | WAB München",
    summary: "Konstruktion komplexer Presswerkzeuge im Werkzeug- und Anlagenbau mit CATIA V5.",
    details:
      "- Konstruktion komplexer Presswerkzeuge mit CATIA V5\n" +
      "- Spezialist für PHS, Formhärten und Warmumformen\n" +
      "- Durchführung konstruktiver Analysen und Optimierungen zur Qualitäts- und Prozessverbesserung\n" +
      "- Prozessoptimierung mittels VBA-gestützter Automatisierungen\n" +
      "- Mitwirkung an „SuPar Interactive Inspection“ (AI Visual Inspection)",
    private_default_hidden: false,
  },
  {
    id: "work-3",
    title: "Data Scientist",
    category: "work",
    start_date: "2022-02",
    end_date: "2023-05",
    organization: "TA-157 | Qualität ItO, Digitalisierung",
    location: "W1.50 | FIZ Nord",
    summary: "Data Scientist im Qualitätsumfeld mit Fokus auf datengetriebene Lösungen und Analytics-Anwendungen.",
    details:
      "- Entwicklung datengetriebener Lösungen im Qualitätsumfeld\n" +
      "- Pilotierung einer PowerApps-Applikation für Werk 0 (ADB)\n" +
      "- Konzeption und Umsetzung eines gDMS-Dashboards in Power BI\n" +
      "- Datenaufbereitung, Modellierung und Visualisierung zur Entscheidungsunterstützung im Qualitätsprozess",
    private_default_hidden: false,
  },
  {
    id: "work-4",
    title: "Shaper PST-VIII - Reporting & Analytics",
    category: "work",
    start_date: "2023-06",
    end_date: "2024-04",
    organization: "TA-157 | Qualität ItO, Digitalisierung",
    location: "W1.50 | FIZ Nord",
    summary:
      "Shaper PST-VIII Reporting & Analytics mit Fokus auf Referenzprozess OtD.00.05 und DART als konzernweiten Service.",
    details:
      "- Shaper Reporting & Analytics im PST-VIII bei Shopfloor.Digital\n" +
      "- Ausarbeitung und bereichsübergreifende Abstimmung des Referenzprozesses „OtD.00.05 – Data Analytics OtD“\n" +
      "- Konzeptionelle Ausarbeitung von DART als konzernweiter Reporting- & Analytics-Service\n" +
      "- Aufbau erster Governance-, Rollen-, Architektur- und Strukturprinzipien für R&A-Szenarien\n" +
      "- Multiplikator und Impulsgeber für KI-Use-Cases im Umfeld Qualität und Shopfloor.Digital",
    private_default_hidden: false,
  },
  {
    id: "work-5",
    title: "Shaper PST-VIII - Reporting & Analytics",
    category: "work",
    start_date: "2024-05",
    end_date: null,
    organization: "TA-134MU | Rotor/Stator/Montage Dingolfing Planungssysteme & Digitalisierung Antrieb",
    location: "W1.50 | FIZ Nord & W2.20 | Werk Dingolfing",
    summary: "Shaper PST-VIII Reporting & Analytics - Entwicklung des technologieübergreifenden Service DART bei SF.D.",
    details:
      "- Zentrale Schnittstelle zwischen Technologie Antrieb und technologieübergreifendem Prozess-Service-Team VIII\n" +
      "- Konzeption, Aufbau und Weiterentwicklung der konzernweiten Shopfloor-Plattform DART (Data Analytics Reporting Tool)\n" +
      "- End-to-End-Steuerung von Anforderungen: Strukturierung, Priorisierung, Umsetzung durch externe IT, Testing und Release-Freigabe\n" +
      "- Rollout- und Governance-Verantwortung (u. a. UX/UI, Rollen- und Berechtigungskonzepte, Go-live Werk Oxford 07/2026)\n" +
      "- Etablierung des Referenzprozesses „OtD.00.05 – Data Analytics OtD“ als Local Process Owner bei TA\n" +
      "- Multiplikator für Generative AI / KI (Use-Case-Identifikation, Enablement, Wissenstransfer) bei SF.D & TA-13",
    private_default_hidden: false,
  },
  {
    id: "priv-1",
    title: "Hochzeit",
    category: "private",
    start_date: "2021-08-20",
    end_date: null,
    organization: null,
    location: null,
    summary: "Hochzeit am 20. August 2021.",
    //details: "- Hochzeit am 20. August 2021.",
    private_default_hidden: true,
  },
  {
    id: "priv-2",
    title: "Geburt Sohn Kaleo",
    category: "private",
    start_date: "2022-02-24",
    end_date: null,
    organization: null,
    location: null,
    summary: "Geburt von Sohn Kaleo.",
    //details: "- Geburt von Sohn Kaleo am 24. Februar 2022.",
    private_default_hidden: true,
  },
  {
    id: "priv-3",
    title: "Geburt Tochter Solea",
    category: "private",
    start_date: "2023-06-19",
    end_date: null,
    organization: null,
    location: null,
    summary: "Geburt von Tochter Solea.",
    //details: "- Geburt von Tochter Solea am 19. Juni 2023.",
    private_default_hidden: true,
  },
];

export function formatDateRange(start: string, end: string | null): string {
  const formatDate = (d: string) => {
    if (d.length === 7) {
      const [y, m] = d.split("-");
      const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
      return `${months[parseInt(m) - 1]} ${y}`;
    }
    const date = new Date(d);
    const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  if (!end) return `seit ${formatDate(start)}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function sortEventsByDate(evts: CVEvent[]): CVEvent[] {
  return [...evts].sort((a, b) => {
    const dateA = a.start_date;
    const dateB = b.start_date;
    return dateB.localeCompare(dateA);
  });
}

export const categoryLabels: Record<EventCategory, string> = {
  work: "Beruf",
  education: "Schule/Weiterbildung",
  private: "Privat",
};
