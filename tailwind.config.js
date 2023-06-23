module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: { primary: "#1c1b1b", secondary: "#ffffff" },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
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
