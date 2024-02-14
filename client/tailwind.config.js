module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('./assets/graph.png')"
      },
      colors: {
        white: "#fff",
        customblue:"#00b7ff",
        bg :{
          1 : "#191924",
          2 : "#252536",
          3:"#2F2F45",
          4:"#13111C",
          5:"#DDDBFF",
        },
        textcolor:"#810FE6",
        textcolorl:"#A643FF",
        textcolorb : "#306EE8",
        bgcarousalheader : "#171A28",
        bgcarousalcontent : "#151723",
  
         
      },
      boxShadow: {
        '3xl':   '0 3px 10px rgba(255,255,255,0.7);',
        '4xl' : "rgba(23, 92, 230, 0.15) 0px 4px 24px",
      }
       
    },
    
  },
  plugins: [],
}