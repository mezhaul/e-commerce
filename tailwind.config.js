/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',    // Small devices (landscape phones, 640px and up)
        'md': '768px',    // Medium devices (tablets, 768px and up)
        'lg': '1024px',   // Large devices (desktops, up to 1024px)
        'xl': '1366px',   // Extra large devices (up to 1366px)
        '2xl': '1920px',  // FHD (up to 1920px)
      },
      colors: {
        customColor: '#F2EDE6',
        customColor2: '#0e0502',
        newColor: "#88BFC4",
      },
    },
  },
  plugins: [],
}
