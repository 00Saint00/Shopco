/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      satoshi: ["Satoshi", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        logo: "url('/src/assets/logo/SHOP.CO.svg')",
        banner: "url('/src/assets/logo/banner.svg')",
        "casual-desktop": "url('/src/assets/items/casual.svg')",
        "casual-mobile": "url('/src/assets/items/casual-mobile.svg')",
        "party-desktop": "url('/src/assets/items/party.svg')",
        "party-mobile": "url('/src/assets/items/party-mobile.svg')",
        "gym-desktop": "url('/src/assets/items/gym.svg')",
        "gym-mobile": "url('/src/assets/items/gym-mobile.svg')",
        "formal-desktop": "url('/src/assets/items/formal.svg')",
        "formal-mobile": "url('/src/assets/items/formal-mobile.svg')",
      },
    },
  },
  plugins: [],
};
