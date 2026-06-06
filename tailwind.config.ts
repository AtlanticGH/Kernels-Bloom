import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "kb-cacao": "#6B3A2A",
        "kb-terracotta": "#A0522D",
        "kb-gold": "#C09A5B",
        "kb-kola": "#D4B896",
        "kb-linen": "#F0EAE0",
        "kb-chalk": "#E8E0D5",
        "kb-dusk": "#2C2420",
        "kb-parchment": "#FAF6F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(56px, 7vw, 96px)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        headline: [
          "clamp(32px, 4vw, 52px)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        subhead: [
          "clamp(20px, 2.5vw, 28px)",
          { lineHeight: "1.3", letterSpacing: "0" },
        ],
        "body-lg": ["17px", { lineHeight: "1.85", letterSpacing: "0.01em" }],
        body: ["15px", { lineHeight: "1.8", letterSpacing: "0.01em" }],
        "body-sm": ["14px", { lineHeight: "1.75", letterSpacing: "0.01em" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        caption: ["12px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        fine: ["11px", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      borderRadius: {
        kb: "2px",
      },
      maxWidth: {
        kb: "1536px",
        "kb-content": "1040px",
        "kb-text": "640px",
        "kb-narrow": "480px",
        "kb-max": "1536px",
      },
      spacing: {
        "kb-1": "8px",
        "kb-2": "16px",
        "kb-3": "24px",
        "kb-4": "32px",
        "kb-6": "48px",
        "kb-8": "64px",
        "kb-12": "96px",
        "kb-16": "128px",
        "kb-20": "160px",
        section: "128px",
        "section-sm": "96px",
        "section-xs": "64px",
        component: "48px",
      },
      letterSpacing: {
        "kb-label": "0.1em",
        "kb-wide": "0.12em",
      },
      keyframes: {
        "kb-fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "kb-chevron": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.7" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "kb-fade-up": "kb-fade-up 600ms cubic-bezier(0.25,0.1,0.25,1)",
        "kb-chevron": "kb-chevron 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
