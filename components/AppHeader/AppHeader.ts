import { Vue, Component } from 'nuxt-property-decorator'
import HeaderCategories from '@/components/Header/HeaderCategories/HeaderCategories.vue'
import SearchBox from '@/components/Header/SearchBox/SearchBox.vue'
import NavbarButtons from '@/components/Header/NavbarButtons/NavbarButtons.vue'
import Overlay from '@/components/Overlay/Overlay.vue'

import AuthLogin from '@/components/Auth/Login/Login.vue'
import AuthRegister from '@/components/Auth/Register/Register.vue'
@Component({
  components: {
    HeaderCategories,
    SearchBox,
    NavbarButtons,
    Overlay,
    AuthLogin,
    AuthRegister
  }
})

export default class AppHeader extends Vue {
  overlayVisible = false

  toggled = false

  overlayComponent = 'AuthLogin'

  toggle () {
    this.toggled = !this.toggled
  }

  openLogin () {
    this.overlayVisible = true
    this.overlayComponent = 'AuthLogin'
  }

  openRegister () {
    this.overlayVisible = true
    this.overlayComponent = 'AuthRegister'
  }

  onChangeOverlay (component: 'AuthLogin' | 'AuthRegister' | 'AuthRestorePassword' | 'AuthConfirmRestore') {
    this.overlayVisible = false
    this.$nextTick(() => {
      this.overlayVisible = true
      this.overlayComponent = component
    })
  }
}
