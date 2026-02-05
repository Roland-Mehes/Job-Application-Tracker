import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // használja a class-t a dark módban
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
