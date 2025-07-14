import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default {
  plugins: [
    ["@tailwindcss/postcss", { config: require('./tailwind.config.js') }],
    "autoprefixer"
  ],
};
