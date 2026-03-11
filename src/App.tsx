import { useState } from "react";
import { useThemeGenerator } from "./hooks/useThemeGenerator";
import ApiKeyInputs from "./components/ApiKeyInputs";
import ThemeForm from "./components/ThemeForm";
import ThemePreview from "./components/ThemePreview";
import MockPreview from "./components/MockPreview";

export default function App() {
  const [description, setDescription] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [backgroundStyle, setBackgroundStyle] = useState("");
  const [configOpen, setConfigOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    geminiApiKey: "",
    anthropicApiKey: "",
    workerUrl: "https://nano-claude-theme-manager.reneebe.workers.dev",
  });

  const { status, theme, paletteImage, error, generate } = useThemeGenerator();

  function handleConfigChange(field: "geminiApiKey" | "anthropicApiKey" | "workerUrl", value: string) {
    setConfig((prev) => ({ ...prev, [field]: value }));
  }

  function handleGenerate() {
    generate(description, { ...config, siteUrl, backgroundStyle });
  }

  function handleCopy() {
    if (!theme) return;
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#050510] p-6 font-sans text-white">
      <div className={`mx-auto transition-all duration-300 ${theme && siteUrl ? "max-w-5xl" : "max-w-md"}`}>
        {/* Header */}
        <div className="mb-6">
          <p className="mb-0.5 font-mono text-[10px] uppercase tracking-widest text-white/25">
            day 04 / 50 projects
          </p>
          <h1 className="text-2xl font-black tracking-tight">
            theme
            <span className="bg-gradient-to-r from-[#f72585] via-[#7209b7] to-[#3a86ff] bg-clip-text text-transparent">
              .generator
            </span>
          </h1>
          <p className="mt-1 text-xs text-white/35">
            Describe a vibe. Get a full UI theme powered by Gemini + Claude.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <ApiKeyInputs
            {...config}
            expanded={configOpen}
            onToggle={() => setConfigOpen((v) => !v)}
            onChange={handleConfigChange}
          />

          <ThemeForm
            description={description}
            siteUrl={siteUrl}
            backgroundStyle={backgroundStyle}
            onDescriptionChange={setDescription}
            onSiteUrlChange={setSiteUrl}
            onBackgroundStyleChange={setBackgroundStyle}
            onGenerate={handleGenerate}
            loading={status === "loading"}
          />

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {theme && status === "success" && (
            <ThemePreview theme={theme} paletteImage={paletteImage} onCopy={handleCopy} copied={copied} />
          )}
        </div>

        {theme && status === "success" && (
          <div className="mt-6">
            <MockPreview theme={theme} siteUrl={siteUrl || undefined} />
          </div>
        )}
      </div>
    </div>
  );
}
