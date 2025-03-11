// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: true,
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/_colors.scss" as *;
          `
        }
      }
    }
  },

  modules: ['@nuxt/icon'],
  plugins: [
    '~/plugins/pinia.js'
  ]
})
