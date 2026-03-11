import type { ThemeVars } from "../types/theme";

type Props = {
  theme: ThemeVars;
  siteUrl?: string;
};

const DEFAULT_THEME: ThemeVars = {
  "--background": "#050510",
  "--foreground": "#f0f0f8",
  "--blob-1": "#f72585",
  "--blob-2": "#7209b7",
  "--blob-3": "#3a86ff",
  "--blob-4": "#06d6a0",
  "--blob-opacity": "0.18",
  "--blob-blur": "120px",
  "--grad-a": "#f72585",
  "--grad-b": "#7209b7",
  "--grad-c": "#3a86ff",
  "--grad-d": "#06d6a0",
  "--glass-bg": "rgba(255,255,255,0.08)",
  "--glass-border": "rgba(255,255,255,0.12)",
  "--glass-strong-bg": "rgba(255,255,255,0.13)",
  "--glass-strong-border": "rgba(255,255,255,0.18)",
  "--blur-glass": "20px",
  "--blur-glass-strong": "32px",
  "--font-heading": "sans-serif",
  "--font-body": "sans-serif",
  "--bg-pattern": "none",
};

function buildCss(v: ThemeVars, prefix: string) {
  return `
    .${prefix}-root {
      background-color: ${v["--background"]};
      color: ${v["--foreground"]};
      font-family: ${v["--font-body"]};
      background-image: ${v["--bg-pattern"] === "none" ? "none" : v["--bg-pattern"]};
    }
    .${prefix}-glass {
      background: ${v["--glass-bg"]};
      border: 1px solid ${v["--glass-border"]};
    }
    .${prefix}-gradient-text {
      background: linear-gradient(135deg, ${v["--grad-a"]}, ${v["--grad-b"]}, ${v["--grad-c"]});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .${prefix}-btn {
      background: linear-gradient(135deg, ${v["--grad-a"]}, ${v["--grad-b"]});
      color: white;
    }
    .${prefix}-btn-ghost {
      background: ${v["--glass-bg"]};
      border: 1px solid ${v["--glass-border"]};
      color: ${v["--foreground"]};
    }
    .${prefix}-tag {
      background: ${v["--grad-a"]}18;
      border: 1px solid ${v["--grad-a"]}35;
      color: ${v["--grad-a"]};
    }
    .${prefix}-muted {
      color: color-mix(in srgb, ${v["--foreground"]} 45%, transparent);
    }
    .${prefix}-divider {
      background: color-mix(in srgb, ${v["--foreground"]} 8%, transparent);
    }
  `;
}

function MockUI({ prefix, theme }: { prefix: string; theme: ThemeVars }) {
  const v = theme;
  return (
    <div className={`${prefix}-root overflow-hidden rounded-xl`} style={{ minHeight: 440 }}>
      {/* Nav */}
      <div className={`${prefix}-glass flex items-center justify-between px-4 py-2.5`}>
        <span className="text-sm font-black" style={{ fontFamily: v["--font-heading"] }}>
          my<span className={`${prefix}-gradient-text`}>site</span>.io
        </span>
        <div className="flex items-center gap-3">
          {["Home", "Work", "Blog"].map((l) => (
            <span key={l} className={`${prefix}-muted text-[10px] font-medium`}>{l}</span>
          ))}
          <button className={`${prefix}-btn rounded-full px-2.5 py-1 text-[10px] font-semibold`}>
            Hire me
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="px-5 py-7">
        <p className={`${prefix}-muted mb-1.5 font-mono text-[9px] uppercase tracking-widest`}>
          fullstack engineer
        </p>
        <h1 className="mb-2 text-2xl font-black leading-tight tracking-tight" style={{ fontFamily: v["--font-heading"] }}>
          I build things
          <br />
          <span className={`${prefix}-gradient-text`}>people use.</span>
        </h1>
        <p className={`${prefix}-muted mb-4 max-w-xs text-xs leading-relaxed`}>
          5+ years taking ideas from whiteboard to production.
        </p>
        <div className="flex gap-2">
          <button className={`${prefix}-btn rounded-lg px-4 py-2 text-xs font-semibold`}>View work</button>
          <button className={`${prefix}-btn-ghost rounded-lg px-4 py-2 text-xs font-medium`}>Read blog</button>
        </div>
      </div>

      {/* Divider */}
      <div className={`${prefix}-divider mx-5 h-px`} />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-2 p-5">
        {[
          { title: "Project Alpha", desc: "Type-safe API on Cloudflare Workers.", tag: "TypeScript" },
          { title: "Dashboard UI", desc: "Real-time analytics with D3 charts.", tag: "React" },
          { title: "CLI Toolkit", desc: "Tooling for deploying edge functions.", tag: "Node.js" },
        ].map((card) => (
          <div key={card.title} className={`${prefix}-glass flex flex-col gap-1.5 rounded-xl p-3`}>
            <h3 className="text-xs font-bold" style={{ fontFamily: v["--font-heading"] }}>{card.title}</h3>
            <p className={`${prefix}-muted flex-1 text-[10px] leading-relaxed`}>{card.desc}</p>
            <span className={`${prefix}-tag self-start rounded-full px-2 py-0.5 text-[9px] font-medium`}>{card.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MockPreview({ theme, siteUrl }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <style>{buildCss(DEFAULT_THEME, "before") + buildCss(theme, "after")}</style>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/60">Theme preview</p>
        {siteUrl && (
          <a
            href={siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 px-3 py-1 text-[10px] font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/80"
          >
            Open site ↗
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">Before</p>
          <MockUI prefix="before" theme={DEFAULT_THEME} />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">After</p>
          <MockUI prefix="after" theme={theme} />
        </div>
      </div>

      <p className="text-center text-[10px] text-white/20">
        Mock UI — CSS injection into real sites requires the{" "}
        <span className="text-white/35">Chrome Extension (Day 05)</span>
      </p>
    </div>
  );
}
