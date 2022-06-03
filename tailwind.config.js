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
      backgroundImage: {
        'front-body': "url('/assets/Front.png')",
        'authen-desktop': "url('/authen/bg-login-desktop.png')",
        'authen-mobile': "url('/authen/bg-login-mobile.png')",
        'back-body': "url('/assets/Back.png')",
      },
      animation: {
        appear: 'appear 0.2s ease-in-out',
      },
      colors: {
        tags: 'rgba(100, 116, 139, 0.4)',
        avgBar: 'rgba(100, 116, 139, 0.4)',
        defaultBackGround: 'rgba(32, 33, 40, 0.68)',
        DefaultTextColor: 'rgb(160, 174, 192)',
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
        Purple: '#8884d8',
        Purple2: '#672aeb',
        light_green: '#09E099',
        Red: 'rgba(214, 12, 12, 1)',
        Stroke: '#484A4D',
        Scrollbar: '#949494',
        Yellow: {
          DEFAULT: 'rgba(255, 150, 7, 1)',
        },
        lighterGray: 'rgba(255, 255, 255, 0.04)',
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
      mobileL: '414px',
      tabletM: '1024px',
      laptopM: '1440px',
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
