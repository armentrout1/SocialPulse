module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "#E5E7EB", // Define border color manually
        foreground: "#111827",
        background: "#F3F4F6", // Fix `bg-background` error
      },
    },
  },
  plugins: [],
};
