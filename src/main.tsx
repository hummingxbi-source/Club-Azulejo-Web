import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";

/* Self-hosted variable fonts (no external requests) */
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "@fontsource-variable/archivo/wdth.css";

import "@/styles/globals.css";
import "@/styles/azulejo.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
