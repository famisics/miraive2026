import type { Config } from 'tailwindcss';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans JP Variable"', 'Arial', 'sans-serif'],
      overpass: ['"Overpass Variable"', 'sans-serif'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    iconsPlugin({
      collections: getIconCollections(['skill-icons', 'tabler']),
    }),
  ],
} satisfies Config;
