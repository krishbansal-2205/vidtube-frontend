/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes:[
      {
        dark:{
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100":"#09090b"
        },
        light:{
          ...require("daisyui/src/theming/themes")["light"],
        }
      }
    ]
  }
}

