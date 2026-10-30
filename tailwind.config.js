/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"VT323"', '"Share Tech Mono"', "monospace"],
        mono: ['"Share Tech Mono"', '"VT323"', "monospace"],
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
      },
      animation: {
        "pip-flicker": "pip-flicker 7s linear infinite",
      },
    },
  },
};
