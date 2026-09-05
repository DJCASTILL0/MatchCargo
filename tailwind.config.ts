import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c2652a",
        "primary-hover": "#a8551f",
        background: "#faf5ee",
        tertiary: "#8c3c3c",
        border: "#d8d0c8",
        "text-dark": "#1a1a1a",
        "text-muted": "#6b5e53",
        surface: "#ffffff",
        "surface-container": "#f5efe7",
      },
      fontFamily: {
        serif: ["EB Garamond", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 16px rgba(58, 48, 42, 0.04)",
        "soft-md": "0 4px 24px rgba(58, 48, 42, 0.08)",
        "soft-lg": "0 8px 32px rgba(58, 48, 42, 0.12)",
      },
      borderRadius: {
        btn: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
