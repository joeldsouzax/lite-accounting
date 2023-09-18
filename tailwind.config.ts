import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['business', 'emerald'],
    darkTheme: 'business',
  },
  plugins: [require('daisyui')],
};
export default config;
