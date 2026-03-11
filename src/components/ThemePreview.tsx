import type { ThemeVars } from "../types/theme";

type Props = {
  theme: ThemeVars;
  paletteImage?: { base64: string; mimeType: string } | null;
  onCopy: () => void;
  copied: boolean;
};

const SWATCH_KEYS = ["--grad-a", "--grad-b", "--grad-c", "--grad-d"] as const;
const VAR_GROUPS = [
  {
    label: "Colors",
    keys: ["--background", "--foreground", "--blob-1", "--blob-2", "--blob-3", "--blob-4"] as const,
  },
  {
    label: "Gradients",
    keys: ["--grad-a", "--grad-b", "--grad-c", "--grad-d"] as const,
  },
];

export default function ThemePreview({ theme, paletteImage, onCopy, copied }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-white/80">Theme generated</p>
          <div className="mt-1.5 flex gap-1">
            {SWATCH_KEYS.map((k) => (
              <div key={k} className="h-3 w-3 rounded-full" style={{ background: theme[k] }} />
            ))}
          </div>
        </div>
        <button
          onClick={onCopy}
          className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/80"
        >
          {copied ? "Copied ✓" : "Copy JSON"}
        </button>
      </div>

      {/* Nano Banana palette image */}
      {paletteImage && (
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Gemini Palette
          </p>
          <img
            src={`data:${paletteImage.mimeType};base64,${paletteImage.base64}`}
            alt="AI-generated color palette"
            className="w-full rounded-xl border border-white/10"
          />
        </div>
      )}

      {/* Color groups */}
      {VAR_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
            {group.label}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {group.keys.map((k) => (
              <div key={k} className="flex items-center gap-1.5 overflow-hidden">
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-md border border-white/10"
                  style={{ background: theme[k] }}
                />
                <span className="truncate text-[10px] text-white/40">{theme[k]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Background pattern */}
      {theme["--bg-pattern"] !== "none" && (
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Background Pattern
          </p>
          <div
            className="h-24 w-full rounded-xl border border-white/10"
            style={{ backgroundImage: theme["--bg-pattern"], backgroundSize: "auto 100%" }}
          />
        </div>
      )}

      {/* Misc */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
          Typography & Glass
        </p>
        <div className="flex flex-col gap-1">
          {(["--font-heading", "--font-body", "--glass-bg", "--blob-opacity"] as const).map((k) => (
            <div key={k} className="flex justify-between text-[10px]">
              <span className="text-white/25">{k}</span>
              <span className="truncate ml-2 text-white/50">{theme[k]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
