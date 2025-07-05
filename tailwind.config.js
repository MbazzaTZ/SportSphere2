/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the files that Tailwind should scan for utility classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in the src directory
    "./public/index.html",       // Also scan the main HTML file
  ],
  // Configure dark mode, typically 'media' or 'class'
  darkMode: 'class', // Enable dark mode based on the 'class' strategy (e.g., adding 'dark' class to html)
  theme: {
    // Extend Tailwind's default theme
    extend: {
      // Custom fonts (if you were to import a custom font like 'Inter')
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Sets 'Inter' as the default sans-serif font
      },
      // Custom colors (example)
      colors: {
        primary: '#3490dc',  // A custom primary blue color
        secondary: '#ffed4a', // A custom secondary yellow color
        // You can add more custom colors here
      },
      // Custom animations (example)
      keyframes: {
        // Define a 'progress' keyframe animation
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        // Define a 'fade-in-up' keyframe animation
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Define a 'marquee' keyframe animation for horizontal scrolling text
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      // Apply custom animations
      animation: {
        progress: 'progress linear',        // Linear animation for progress bars
        'fade-in-up': 'fade-in-up 0.3s ease-out', // Ease-out animation for fade-in effect
        marquee: 'marquee 8s linear infinite', // Continuous linear marquee animation
      },
    },
  },
  // Add Tailwind plugins here (e.g., for forms, typography)
  plugins: [],
};
