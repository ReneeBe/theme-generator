import { useRef, useState } from "react";
import type { ThemeVars } from "../types/theme";

type Props = {
  siteUrl: string;
  theme: ThemeVars;
};

export default function SitePreview({ siteUrl, theme }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [injected, setInjected] = useState(false);
  const [blocked, setBlocked] = useState(false);

  function injectTheme() {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error("blocked");

      const existing = doc.getElementById("__theme-generator-styles__");
      if (existing) existing.remove();

      const style = doc.createElement("style");
      style.id = "__theme-generator-styles__";
      const vars = Object.entries(theme)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n");
      style.textContent = `:root {\n${vars}\n}`;
      doc.head.appendChild(style);
      setInjected(true);
    } catch {
      setBlocked(true);
    }
  }

  if (!siteUrl) return null;

  const normalizedUrl =
    siteUrl.startsWith("http://") || siteUrl.startsWith("https://")
      ? siteUrl
      : `https://${siteUrl}`;

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/60">Site preview</p>
        <div className="flex gap-2">
          {!blocked && (
            <button
              onClick={injectTheme}
              className="rounded-lg border border-white/10 px-3 py-1 text-[10px] font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/80"
            >
              {injected ? "Theme applied ✓" : "Inject theme"}
            </button>
          )}
          <a
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 px-3 py-1 text-[10px] font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/80"
          >
            Open ↗
          </a>
        </div>
      </div>

      {blocked ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/3 py-8 text-center">
          <p className="text-xs text-white/40">This site blocks embedding.</p>
          <p className="text-[10px] text-white/25">
            Full injection coming in Day 05 — Chrome Extension.
          </p>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={normalizedUrl}
          onLoad={injectTheme}
          onError={() => setBlocked(true)}
          className="h-[480px] w-full rounded-xl border border-white/8"
          title="Site preview"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  );
}
