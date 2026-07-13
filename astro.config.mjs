import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://matters-safety-guide.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
})
