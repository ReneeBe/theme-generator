# Theme Generator

A Vite/React UI for AI theme generation — describe a vibe, get a full UI theme. Day 4 of my [50 projects challenge](https://reneebe.github.io).

**[Live demo →](https://reneebe.github.io/theme-generator)**

## How it works

1. Enter a description ("deep sea bioluminescence", "retro 80s arcade")
2. Optionally add a site URL to preview the theme applied to a real page, and a background style hint
3. The app calls the [nano-claude-theme-manager](https://github.com/ReneeBe/nano-claude-theme-manager) Cloudflare Worker (Day 3), which chains Gemini image generation + Claude vision to produce a `ThemeVars` JSON object
4. The generated theme is previewed live and can be copied as JSON

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [nano-claude-theme-manager](https://github.com/ReneeBe/nano-claude-theme-manager) — the Cloudflare Worker backend (you'll need your own deployment or API keys)

## Running locally

```bash
npm install
npm run dev
```

You'll need a deployed instance of [nano-claude-theme-manager](https://github.com/ReneeBe/nano-claude-theme-manager) and its URL, plus Gemini and Anthropic API keys — enter them in the config panel in the app.
