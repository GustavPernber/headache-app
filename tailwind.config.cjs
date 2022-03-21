module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {

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
        // appGreen:{
        //   100:"47CE8D",
        //   200:"26B17F",
        // },
        lightGrey:"#D2D2D2",
        white:"#EBEDF0",
        // appDark:{
        //   100:"#294761",
        //   200:"#112A40",
        //   300:"#0A1825"
        // }, 
        // appPink:"#DF6886",
        // appOrange:"#CD7360"
      },
    },
  },
  plugins: [],
}
