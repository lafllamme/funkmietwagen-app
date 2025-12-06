// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@nuxt/icon', '@pinia/nuxt'],
  pages: true,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
      ],
    },
  },
  // Global CSS
  css: [
    '@/assets/reset/main.ts',
    '@/assets/styles/theme.css',
  ],
  runtimeConfig: {
    resend: {
      EMAIL_FROM: '',
      EMAIL_TO: '',
      API_KEY: '',
    },
    friendly: {
      API_URL: '',
      API_KEY: '',
    },
    akismet: {
      API_KEY: '',
      BLOG_URL: '',
    },
  },
})
