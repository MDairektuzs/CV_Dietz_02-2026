import { createRoot } from "react-dom/client"; 
import App from "./App.tsx"; 
import "./index.css"; 

const REPO_BASE = "/CV_Dietz_02-2026"; 

// Wenn wir auf GitHub Pages unter /<repo>/ starten, normalisieren wir auf / 
if (location.pathname.startsWith(REPO_BASE)) { 
  const newPath = location.pathname.slice(REPO_BASE.length) || "/"; 
  const newUrl = newPath + location.search + location.hash; 
  history.replaceState(null, "", newUrl); 
} 

createRoot(document.getElementById("root")!).render(<App />);
