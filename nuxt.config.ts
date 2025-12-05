// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@nuxt/icon', '@pinia/nuxt'],
  pages: true,
  routeRules: {
    '/vorbestellung': { prerender: true },
    '/ueber-uns': { prerender: true },
    '/impressum': { prerender: true },
    '/datenschutz': { prerender: true },
    '/nutzungsbedingungen': { prerender: true },
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
