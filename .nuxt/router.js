import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _27018aa0 = () => interopDefault(import('../pages/application.vue' /* webpackChunkName: "pages/application" */))
const _e542f99c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _709f3d76 = () => interopDefault(import('../pages/models/view/_slug.vue' /* webpackChunkName: "pages/models/view/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/application",
    component: _27018aa0,
    name: "application___en"
  }, {
    path: "/ru",
    component: _e542f99c,
    name: "index___ru"
  }, {
    path: "/ru/application",
    component: _27018aa0,
    name: "application___ru"
  }, {
    path: "/ru/models/view/:slug?",
    component: _709f3d76,
    name: "models-view-slug___ru"
  }, {
    path: "/models/view/:slug?",
    component: _709f3d76,
    name: "models-view-slug___en"
  }, {
    path: "/",
    component: _e542f99c,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
