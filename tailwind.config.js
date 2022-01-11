module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{html}',
  ],
  theme: {
    extend: {
      colors: {
        Neutral: {
          300: 'rgba(209, 213, 219, 1)',
          400: 'rgba(156, 163, 175, 1)',
          900: '#111827',
        },
        lightestGray: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        SVNGilroy: ['SVN-Gilroy'],
      },
      spacing: {
        '100vw-280px': 'calc(100vw - 280px)',
        '100vw-290px': 'calc(100vw - 290px)',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
}
