module.exports = {
  env: {
    isDev: process.env.NODE_ENV === 'development'
  },
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  modern: 'client',
  watchers: {
    webpack: {
      ignored: [/\.nuxt\//, /node_modules/]
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'MeshHouse',
    titleTemplate: '%s - MeshHouse',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Free 3d models for commerial use' },
      { name: 'apple-mobile-web-app-title', content: 'MeshHouse' },
      { name: 'application-name', content: 'MeshHouse' },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#2b5797' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/manifest.json' },
      { rel: 'mask-icon', color: '#5bbad5', href: '/favicon/safari-pinned-tab.svg' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  render: {
    resourceHints: true,
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 30
    },
    bundleRenderer: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      shouldPreload: (file, type) => {
        return ['style', 'font'].includes(type)
      }
    }
  },
  css: [
    '~/node_modules/swiper/css/swiper.css'
  ],
  styleResources: {
    sass: ['~sass/_variables.sass']
  },
  plugins: [
    { src: '~/plugins/axios.ts' },
    { src: '~/plugins/i18n.ts' },
    { src: '~/plugins/fontawesome.ts' },
    { src: '~/plugins/vue-awesome-swiper.ts', mode: 'client' },
    { src: '~/plugins/vue-debounce.ts', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['nuxt-i18n', {
      vueI18nLoader: true,
      defaultLocale: 'en',
      detectBrowserLanguage: {
        useCookie: true,
        alwaysRedirect: false
      },
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          file: 'en/index.ts'
        },
        {
          code: 'ru',
          iso: 'ru',
          file: 'ru/index.ts'
        }
      ],
      lazy: true,
      langDir: 'locales/',
      seo: true,
      vueI18n: '~/plugins/i18n.ts'
    }]
  ],
  axios: {
    proxy: false
  },
  proxy: {
  },
  router: {
    prefetchLinks: false
  }
}

