import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://SEU_USUARIO.github.io',
  base: '/meu-portfolio',
  vite: {
    plugins: [tailwindcss()],
  },
});