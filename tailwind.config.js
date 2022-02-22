const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './module/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      animation: {
        appear: 'appear 2s ease-in-out',
      },
      colors: {
        Blue: '#4654EA',
        'Dark-1': '#252627',
        'Dark-2': 'rgba(30, 31, 36, 1)',
        'Dark-3': '#13161A',
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
        Stroke: '#484A4D',
        Scrollbar: '#949494',
        Yellow: {
          DEFAULT: 'rgba(255, 150, 7, 1)',
        },
      },
      fontFamily: {
        SVNGilroy: ['SVN-Gilroy'],
        Inter: ['Inter'],
        Roboto: ['Roboto'],
      },

      keyframes: {
        appear: {
          '0%': { opacity: '0' },
          '70%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '100vw-280px': 'calc(100vw - 280px)',
        '100vw-290px': 'calc(100vw - 290px)',
        '100%-32px': 'calc(100% - 32px)',
        '100%-16px': 'calc(100% - 16px)',
      },
    },

    screens: {
      mobileM: '375px',
      ...defaultTheme.screens,

      max_sm: { max: '640px' },
      max_md: { max: '768px' },
      max_lg: { max: '1024px' },
      max_xl: { max: '1280px' },
      max_2xl: { max: '1536px' },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
}
