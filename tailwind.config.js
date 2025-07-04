/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'default-bg': '#d2c1a0',
        'default-border': '#AB886D',
        'default-btn': '#6C4E31',
        'filter-btn': '#AB886D',
        'home-bg': 'white',
        'home-border': '#D6C0B3',
        'request-detail': '#ffe6a7',
        'request-proceed': '#dda15e',
        'request-reject': '#f05650',
        'request-done': '#a7c957',
        'apply-title': '#6C4E31',
        'apply-text': '#6C4E31',
        'apply-bg': '#e1d3b8',
        'input-field': '#fefae0',
        'btn-floating': '#AB886D',
        'light-btn': '#AB886D',
        'emoji-flirt': '#f28482',
        'emoji-happy': '#6a994e',
        'emoji-neutral': '#a98467',
        'emoji-sad': '#6c757d',
        'tab-active': '#AB886D',
        'tab-inactive': '#d2c1a0',
        'toast-success': '#a7c957',
        'toast-fail': '#f05650',
        'success-btn': '#B0EAC0',
        'reject-btn': '#F5C6C6',
      }
    }
  },
  plugins: [],
}