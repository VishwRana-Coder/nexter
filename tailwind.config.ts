import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        light: {
          background: "#f4f4f4", //Background Color
          accent: "#344ceb", //Additional Color
          primary: "#1f1f1f", //Main Color
          secondary: "#5b99fc",
        }, //For light theme
        dark: {
          background: "#1f1f1f", //Background Color
          accent: "#2b5fd9", //Additional Color
          primary: "#f4f4f4", //Main Color
          secondary: "#3382ff",
        }, //For dark theme
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config