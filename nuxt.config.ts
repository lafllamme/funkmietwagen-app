// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@nuxt/icon', '@pinia/nuxt'],
  pages: true,
  routeRules: {
    '/vorbestellung': { prerender: true },
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
  },
})
