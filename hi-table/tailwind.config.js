/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    keyframes:{
      shimmer:{
        '100%':{transform : 'translateX(100%)'}
      }
    }
  },
  plugins: [require("daisyui")],
};
