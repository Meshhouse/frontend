import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faAngleDoubleLeft,
  faSun,
  faMoon,
  faCalendarAlt,
  faSearch,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

import {
  faApple,
  faLinux,
  faWindows
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBars,
  faAngleDoubleLeft,
  faSun,
  faMoon,
  faCalendarAlt,
  faSearch,
  faCheckCircle,
  faTimesCircle,
  faApple,
  faLinux,
  faWindows
)

// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('font-awesome-icon', FontAwesomeIcon)
