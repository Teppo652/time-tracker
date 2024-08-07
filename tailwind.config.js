module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "4.7xl": "4.7rem",
        xxs: "0.5rem",
      },
      colors: {
        "light-gray": "#e8e8e8",
        "dark-gray": "#8c8c8c",
        blue: "#1d7cc0",
        "dark-blue": "#15659e",
        green: "#64d47e",
        "light-green": "#52bc41",
        "dark-green": "#36a026",
        red: "#cd3f6c",
      },
      borderRadius: {
        custom: "1.15rem",
        "xl-custom": "2.15rem",
      },
      maxWidth: {
        sm: "28rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
