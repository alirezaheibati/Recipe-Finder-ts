module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      height: {
        "screen-minus-96px": "calc(100vh - 96px)",
        "screen-minus-88px": "calc(100vh - 88px)",
        contianer: "calc(100% - 32px)",
      },
      width: {
        "search-input": "calc(100% - 56px)",
      },
      borderRadius: {
        "4xl": "30px",
      },
      borderWidth: {
        "4xl": "64px",
        "3xl": "16px",
      },
      outlineWidth: {
        "4xl": "64px",
      },
    },
    screens: {
      tm: "460px",

      sm: "640px",

      md: "768px",

      lg: "992px",

      xl: "1280px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
