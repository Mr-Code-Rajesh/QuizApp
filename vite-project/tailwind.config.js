// tailwind.config.js
export const content = [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Make sure all your files are scanned for Tailwind classes
  ];
  export const theme = {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  };
  export const plugins = [];
  