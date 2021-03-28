import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faSun,
  faMoon,
  faCalendarAlt,
  faSearch,
  faCheck,
  faCheckCircle,
  faTimes,
  faTimesCircle,
  faInfo,
  faExclamation,
  faVenus,
  faDonate,
  faCaretDown,
  faCloudDownloadAlt,
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
  faCube,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons'

import {
  faApple,
  faLinux,
  faWindows
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBars,
  faSun,
  faMoon,
  faCalendarAlt,
  faSearch,
  faCheck,
  faCheckCircle,
  faTimes,
  faTimesCircle,
  faInfo,
  faExclamation,
  faVenus,
  faDonate,
  faCaretDown,
  faCloudDownloadAlt,
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
  faCube,
  faShareAlt,
  faApple,
  faLinux,
  faWindows
)

// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('font-awesome-icon', FontAwesomeIcon)
