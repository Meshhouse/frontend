import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_pluginseo_e3e776ba from 'nuxt_plugin_pluginseo_e3e776ba' // Source: ./nuxt-i18n/plugin.seo.js (mode: 'all')
import nuxt_plugin_pluginrouting_2a159f1a from 'nuxt_plugin_pluginrouting_2a159f1a' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_21e99ad6 from 'nuxt_plugin_pluginmain_21e99ad6' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_d55bcc58 from 'nuxt_plugin_cookieuniversalnuxt_d55bcc58' // Source: ./cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_2e0a522c from 'nuxt_plugin_axios_2e0a522c' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_axios_5659cf26 from 'nuxt_plugin_axios_5659cf26' // Source: ../plugins/axios.ts (mode: 'all')
import nuxt_plugin_i18n_1fba4fce from 'nuxt_plugin_i18n_1fba4fce' // Source: ../plugins/i18n.ts (mode: 'all')
import nuxt_plugin_fontawesome_b8db3322 from 'nuxt_plugin_fontawesome_b8db3322' // Source: ../plugins/fontawesome.ts (mode: 'all')
import nuxt_plugin_vueawesomeswiper_5ce0408e from 'nuxt_plugin_vueawesomeswiper_5ce0408e' // Source: ../plugins/vue-awesome-swiper.ts (mode: 'client')
import nuxt_plugin_vuedebounce_b1e84f72 from 'nuxt_plugin_vuedebounce_b1e84f72' // Source: ../plugins/vue-debounce.ts (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"MeshHouse","titleTemplate":"%s - MeshHouse","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Free 3d models for commerial use"},{"name":"apple-mobile-web-app-title","content":"MeshHouse"},{"name":"application-name","content":"MeshHouse"},{"name":"msapplication-TileColor","content":"#2b5797"},{"name":"msapplication-config","content":"\u002Ffavicon\u002Fbrowserconfig.xml"},{"name":"theme-color","content":"#2b5797"}],"link":[{"rel":"apple-touch-icon","sizes":"180x180","href":"\u002Ffavicon\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon\u002Ffavicon-16x16.png"},{"rel":"manifest","href":"\u002Ffavicon\u002Fmanifest.json"},{"rel":"mask-icon","color":"#5bbad5","href":"\u002Ffavicon\u002Fsafari-pinned-tab.svg"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_pluginseo_e3e776ba === 'function') {
    await nuxt_plugin_pluginseo_e3e776ba(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_2a159f1a === 'function') {
    await nuxt_plugin_pluginrouting_2a159f1a(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_21e99ad6 === 'function') {
    await nuxt_plugin_pluginmain_21e99ad6(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_d55bcc58 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_d55bcc58(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_2e0a522c === 'function') {
    await nuxt_plugin_axios_2e0a522c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_5659cf26 === 'function') {
    await nuxt_plugin_axios_5659cf26(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_1fba4fce === 'function') {
    await nuxt_plugin_i18n_1fba4fce(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_b8db3322 === 'function') {
    await nuxt_plugin_fontawesome_b8db3322(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueawesomeswiper_5ce0408e === 'function') {
    await nuxt_plugin_vueawesomeswiper_5ce0408e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuedebounce_b1e84f72 === 'function') {
    await nuxt_plugin_vuedebounce_b1e84f72(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
