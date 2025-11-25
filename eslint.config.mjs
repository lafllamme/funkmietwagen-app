import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    unocss: true,
    vue: true,
    nuxt: true,
    typescript: true,
    ignores: [
      'node_modules',
      '.nuxt',
      '.output',
      'dist',
      '.cache',
      '.nitro',
    ],
  },
  {
    rules: {
      'no-console': 'warn',
      'vue/no-unused-vars': 'error',
    },
  },
)


