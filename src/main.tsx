import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const REPO_BASE = "/CV_Dietz_02-2026";

// Wenn die App auf die Root-Domain springt, zurück unter den Repo-Pfad
if (location.pathname === "/" && location.host.endsWith("github.io")) {
  history.replaceState(null, "", `${REPO_BASE}/` + location.search + location.hash);
}

createRoot(document.getElementById("root")!).render(<App />);
