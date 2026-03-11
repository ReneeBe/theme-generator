type Props = {
  description: string;
  siteUrl: string;
  backgroundStyle: string;
  onDescriptionChange: (v: string) => void;
  onSiteUrlChange: (v: string) => void;
  onBackgroundStyleChange: (v: string) => void;
  onGenerate: () => void;
  loading: boolean;
};

const SITE_EXAMPLES = [
  { label: "Hacker News", url: "https://news.ycombinator.com" },
  { label: "Wikipedia", url: "https://en.wikipedia.org" },
  { label: "GitHub", url: "https://github.com" },
];

const EXAMPLES = [
  "ocean at dusk",
  "retro 80s arcade",
  "deep sea bioluminescence",
  "cherry blossom spring",
  "brutalist concrete",
  "neon tokyo rainstorm",
];

const PATTERN_EXAMPLES = ["leopard print", "polka dots", "diagonal stripes", "grid lines"];

export default function ThemeForm({
  description,
  siteUrl,
  backgroundStyle,
  onDescriptionChange,
  onSiteUrlChange,
  onBackgroundStyleChange,
  onGenerate,
  loading,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Site URL <span className="normal-case text-white/20">(optional — for preview)</span>
        </label>
        <input
          type="url"
          value={siteUrl}
          onChange={(e) => onSiteUrlChange(e.target.value)}
          placeholder="https://yoursite.com"
          className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:border-white/15 focus:outline-none"
        />
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {SITE_EXAMPLES.map((ex) => (
            <button
              key={ex.url}
              onClick={() => onSiteUrlChange(ex.url)}
              className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-white/30 transition-colors hover:border-white/15 hover:text-white/50"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Describe your theme
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onGenerate();
          }}
          placeholder={`"ocean at dusk"\n"retro 80s arcade"\n"deep sea bioluminescence"...`}
          rows={3}
          className="w-full resize-none rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:border-white/15 focus:outline-none"
        />
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => onDescriptionChange(ex)}
              className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-white/30 transition-colors hover:border-white/15 hover:text-white/50"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Background pattern <span className="normal-case text-white/20">(optional)</span>
        </label>
        <input
          type="text"
          value={backgroundStyle}
          onChange={(e) => onBackgroundStyleChange(e.target.value)}
          placeholder="leopard print, polka dots, diagonal stripes..."
          className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:border-white/15 focus:outline-none"
        />
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {PATTERN_EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => onBackgroundStyleChange(ex)}
              className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-white/30 transition-colors hover:border-white/15 hover:text-white/50"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!description.trim() || loading}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #f72585, #7209b7)" }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Generating…
          </span>
        ) : (
          "✨ Generate Theme"
        )}
      </button>

      <p className="text-center text-[10px] text-white/20">⌘↩ to generate</p>
    </div>
  );
}
