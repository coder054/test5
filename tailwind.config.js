module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './module/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'Dark-1': '#252627',
        DividerColor: 'rgba(100, 116, 139, 0.4)',
        Grey: '#818389',
        Green: 'rgba(9, 224, 153, 1)',
        lightestGray: 'rgba(255, 255, 255, 0.08)',
        Neutral: {
          300: 'rgba(209, 213, 219, 1)',
          400: 'rgba(156, 163, 175, 1)',
          900: '#111827',
        },
        Primary: {
          Main: '#5048E5',
        },

        Red: 'rgba(214, 12, 12, 1)',
        Yellow: 'rgba(255, 150, 7, 1)',
      },
      fontFamily: {
        SVNGilroy: ['SVN-Gilroy'],
      },
      spacing: {
        '100vw-280px': 'calc(100vw - 280px)',
        '100vw-290px': 'calc(100vw - 290px)',
        '100%-32px': 'calc(100% - 32px)',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
}
