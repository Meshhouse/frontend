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
  faCopyright,
  faUser,
  faPlus,
  faMinus,
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
  faHeart,
  faFilter,
  faSortAlphaDown,
  faCompress,
  faExpand,
  faDrawPolygon,
  faSadCry
} from '@fortawesome/free-solid-svg-icons'

import {
  faApple,
  faLinux,
  faWindows,
  faPatreon,
  faGithub
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
  faCopyright,
  faUser,
  faPlus,
  faMinus,
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
  faHeart,
  faApple,
  faLinux,
  faWindows,
  faPatreon,
  faFilter,
  faGithub,
  faSortAlphaDown,
  faCompress,
  faExpand,
  faDrawPolygon,
  faSadCry
)

// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('font-awesome-icon', FontAwesomeIcon)
