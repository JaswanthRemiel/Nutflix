import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Ensure content paths are correct
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        primaryHover: "#535bf2",
        darkBg: "#242424",
        lightBg: "#ffffff",
        darkText: "rgba(255, 255, 255, 0.87)",
        lightText: "#213547",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
