module.exports = {
  env: {
    isDev: process.env.NODE_ENV === 'development',
    apiKey: process.env.API_SECRET_KEY,
    BROWSER_API_URL: process.env.BROWSER_API_URL,
    SSR_API_URL: process.env.SSR_API_URL,
    HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  modern: process.env.NODE_ENV === 'production' ? 'client' : false,
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
  loading: '~/components/Loader/Loader.vue',
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
    postcss: false
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
    '~/node_modules/swiper/css/swiper.css',
    '~sass/main.sass'
  ],
  styleResources: {
    sass: [
      '~sass/_variables.sass'
    ]
  },
  plugins: [
    { src: '~/plugins/axios.ts' },
    { src: '~/plugins/i18n.ts' },
    { src: '~/plugins/fontawesome.ts' },
    { src: '~/plugins/vue-awesome-swiper.ts', mode: 'client' },
    { src: '~/plugins/vue-slider.ts', mode: 'client' },
    { src: '~/plugins/vue-debounce.ts', mode: 'client' },
    { src: '~/plugins/model-viewer.ts' },
    { src: '~/plugins/vuelidate.ts' },
    { src: '~/plugins/components.ts' },
    { src: '~/plugins/auth.ts' }
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxt/typescript-build',
    'nuxt-webpack-optimisations'
  ],
  modules: [
    ['@nuxtjs/i18n', {
      vueI18nLoader: true,
      defaultLocale: 'en',
      detectBrowserLanguage: false,
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
    }],
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'portal-vue/nuxt',
    '@nuxtjs/sentry'
  ],
  router: {
    prefetchLinks: false,
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'models',
        path: '/models',
        component: resolve(__dirname, 'pages/models/_category/index.vue')
      })
    }
  },
  webpackOptimisations: {
    features: {
      postcssNoPolyfills: true,
      esbuildLoader: false,
      esbuildMinifier: true,
      imageFileLoader: true,
      webpackOptimisations: true,
      cacheLoader: false,
      hardSourcePlugin: false,
      parallelPlugin: false
    },
    debug: true
  },
  sentry: {
    dsn: 'https://053b9ad3c1164a59941d31b6c6edfbeb@o1322428.ingest.sentry.io/6579508',
    tracing: {
      tracesSampleRate: 1.0,
      vueOptions: {
        tracing: true,
        tracingOptions: {
          hooks: ['mount', 'update'],
          timeout: 2000,
          trackComponents: true
        }
      },
      browserOptions: {}
    }
  }
}

