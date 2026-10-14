/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"VT323"', '"Share Tech Mono"', "monospace"],
        mono: ['"Share Tech Mono"', '"VT323"', "monospace"],
      },
      colors: {
        pip: {
          green: "#33ff66",
          amber: "#ffb000",
          blue: "#8df5ff",
          paper: "#e8f5d6",
          red: "#ff3b3b",
          ink: "#060805",
        },
      },
      keyframes: {
        "pip-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.86" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.94" },
          "97%": { opacity: "1" },
        },
        "pip-blink": {
          "0%, 60%": { opacity: "1" },
          "61%, 100%": { opacity: "0.15" },
        },
        "pip-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pip-scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pip-static": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2%, 1%)" },
          "50%": { transform: "translate(1%, -2%)" },
          "75%": { transform: "translate(-1%, 2%)" },
          "100%": { transform: "translate(2%, -1%)" },
        },
      },
      animation: {
        "pip-flicker": "pip-flicker 7s linear infinite",
        "pip-blink": "pip-blink 1.1s steps(1) infinite",
        "pip-bob": "pip-bob 3.2s ease-in-out infinite",
        "pip-static": "pip-static 0.35s steps(2) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
