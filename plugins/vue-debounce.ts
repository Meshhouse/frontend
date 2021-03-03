import Vue from 'vue'
import vueDebounce, { PluginConfig } from 'vue-debounce'

Vue.use<PluginConfig>(vueDebounce, {
  lock: true, defaultTime: '400ms', listenTo: 'input'
})
