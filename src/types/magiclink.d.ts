interface MagicLink {
  hasToken: boolean
  projectId: string | null
  claude: (params: unknown) => Promise<{ result: unknown; usage: { count: number; limit: number; remaining: number } }>
  gemini: (params: unknown) => Promise<{ result: unknown; usage: { count: number; limit: number; remaining: number } }>
  clearToken: () => void
}

declare global {
  interface Window {
    magiclink?: MagicLink
  }
}

export {}
