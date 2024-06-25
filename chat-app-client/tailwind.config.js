/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customLight: {
          DEFAULT: "##F0F2F5", // Light mode default color
          dark: "#2E2A47", // Dark mode equivalent color
        },
        customDark: {
          DEFAULT: "#2E2A47", // Dark mode default color
          light: "#F0F2F5", // Light mode equivalent color
        },
      },
    },
  },

  plugins: [],
};
