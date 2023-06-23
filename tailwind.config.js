module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    colors: { Style: "#1c1b1b", "#FFFFFF": "#ffffff" },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "2rem",
      "2xl": "2.625rem",
      "3xl": "4.5rem",
    },
    fontFamily: {
      display: ["Bellinzo Regular"],
      body: ["Bellinzo Light"],
      "bellinzo-bold": "Bellinzo Bold",
      "bellinzo-regular": "Bellinzo Regular",
      "bellinzo-light": "Bellinzo Light",
    },
    borderRadius: {
      none: "0",
      xs: "1.25rem",
      sm: "1.7655891180038452rem",
      default: "1.875rem",
      lg: "2rem",
      xl: "2.5rem",
      "2xl": "5rem",
      full: "9999px",
    },
  },
  plugins: [],
};
