import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://SEU_USUARIO.github.io',
  base: '/meu-portfolio', // O nome exato que você vai dar ao repositório
  integrations: [tailwind()]
});