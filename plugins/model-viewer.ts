import Vue from 'vue'

if (!process.browser) {
  (global as any).HTMLElement = () => {}
  (global as any).customElements = { define: () => {} }
  require('@skatejs/ssr/register')
}

Vue.config.ignoredElements = [
  'model-viewer'
]
