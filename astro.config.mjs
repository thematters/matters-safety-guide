import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://safety.matters.town',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
})
