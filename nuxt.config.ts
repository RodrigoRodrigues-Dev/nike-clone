// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: true,
  css: ['~/assets/scss/main.scss'],

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dbs7ev5az/image/upload/',
      format: 'webp'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Nike Clone',
      meta: [
        { name: 'description', content: 'Website created as a personal project, intended to be a clone of the Nike website.' }
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/FuturaNdForNike/futura-nd-for-nike-365-cn-xbd.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/HelveticaNowText/HelveticaNowText-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

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

  modules: ['@nuxt/icon', '@nuxt/image'],
  plugins: [
    '~/plugins/pinia.js'
  ]
})
