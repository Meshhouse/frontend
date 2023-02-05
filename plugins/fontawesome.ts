/* eslint-disable vue/component-definition-name-casing */
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
  faSadCry,
  faThumbsUp,
  faChartLine,
  fa1,
  fa8
} from '@fortawesome/free-solid-svg-icons'

import {
  faCopyright
} from '@fortawesome/free-regular-svg-icons'

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
  faSadCry,
  faThumbsUp,
  faChartLine,
  fa1,
  fa8
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
