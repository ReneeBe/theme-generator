import { useState } from "react";
import type { ThemeVars, GenerateStatus } from "../types/theme";

const MAGICLINK_URL = "https://magiclink.reneebe.workers.dev/api/projects/theme-generator";

const FONT_MAP: Record<string, string> = {
  serif: "'Lora', Georgia, serif",
  "sans-serif": "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  monospace: "'Courier New', Courier, monospace",
  cursive: "'Pacifico', cursive",
  fantasy: "'Orbitron', fantasy",
};

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Orbitron:wght@400;700;900&family=Lora:wght@400;700&family=Pacifico&display=swap";

function loadGoogleFonts() {
  if (document.getElementById("theme-generator-fonts")) return;
  const link = document.createElement("link");
  link.id = "theme-generator-fonts";
  link.rel = "stylesheet";
  link.href = GOOGLE_FONTS_URL;
  document.head.appendChild(link);
}

function resolveFont(val: string): string {
  return FONT_MAP[val.trim().toLowerCase()] ?? val;
}

type GenerateOptions = {
  siteUrl?: string;
  backgroundStyle?: string;
};

export function useThemeGenerator() {
  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [theme, setTheme] = useState<ThemeVars | null>(null);
  const [paletteImage, setPaletteImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [error, setError] = useState<string>("");

  async function generate(description: string, options: GenerateOptions = {}) {
    if (!description.trim()) return;

    loadGoogleFonts();
    setStatus("loading");
    setError("");

    try {
      const token = localStorage.getItem("magiclink_token");
      const res = await fetch(MAGICLINK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(token && { token }),
          description,
          ...(options.backgroundStyle && { backgroundStyle: options.backgroundStyle }),
        }),
      });
      const json = await res.json() as Record<string, unknown>;
      if (!res.ok) throw new Error((json.error as string) || "Generation failed");
      const data = (json.result ?? json) as Record<string, unknown>;

      // Support both old format (bare ThemeVars) and new format ({ vars, paletteImage })
      const vars: ThemeVars = (data.vars ?? data) as ThemeVars;
      vars["--font-heading"] = resolveFont(vars["--font-heading"]);
      vars["--font-body"] = resolveFont(vars["--font-body"]);

      setTheme(vars);
      if (data.paletteImage) setPaletteImage(data.paletteImage as { base64: string; mimeType: string });
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setTheme(null);
    setPaletteImage(null);
    setError("");
  }

  return { status, theme, paletteImage, error, generate, reset };
}
