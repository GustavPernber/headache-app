const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    // font-family: 'Inter', sans-serif;
    // font-family: 'Open Sans', sans-serif;
    // font-family: 'Poppins', sans-serif;
    //TODO ladda ner bara de fonter som faktiskt behövs
    fontFamily:{
      'sans':['Poppins', ...defaultTheme.fontFamily.sans]
    },

    extend: {
      colors:{
        green:{
          100:"#3BC393",
          200:"#4ABEA9"
        },
        pink:{
          100:"#D17289",
          200:"#DB5F8B"
        },
        appDark:{
          100:"#3D4852",
          200:"#293540",
          300:"#0A1825",
        },
        lightGrey:"#D2D2D2",
        white:"#EBEDF0",

      },
    },
  },
  plugins: [],
}
