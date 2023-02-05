import { Vue, Component } from 'nuxt-property-decorator'
import HeaderCategories from '@/components/layout/Header/HeaderCategories/HeaderCategories.vue'
import SearchBox from '@/components/layout/Header/SearchBox/SearchBox.vue'
import NavbarButtons from '@/components/layout/Header/NavbarButtons/NavbarButtons.vue'

import AuthLogin from '@/components/Modals/Login/Login.vue'
import AuthRegister from '@/components/Modals/Register/Register.vue'
import AuthResetPassword from '@/components/Modals/ResetPassword/ResetPassword.vue'
import HeaderMobile from '@/components/layout/Header/HeaderMobile/HeaderMobile.vue'
import HeaderMobileCategories from '@/components/layout/Header/HeaderMobile/HeaderMobileCategories.vue'

type SwitchableModals = 'AuthLogin' | 'AuthRegister' | 'AuthRestorePassword' | 'AuthConfirmRestore' | 'HeaderMobileCategories' | 'HeaderMobile' | 'AuthResetPassword'
@Component<AppHeader>({
  components: {
    HeaderCategories,
    SearchBox,
    NavbarButtons,
    AuthLogin,
    AuthRegister,
    HeaderMobile,
    HeaderMobileCategories,
    AuthResetPassword
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

  openMobileMenu () {
    this.overlayVisible = true
    this.overlayComponent = 'HeaderMobile'
  }

  onChangeOverlay (component: SwitchableModals) {
    this.overlayVisible = false
    this.$nextTick(() => {
      this.overlayVisible = true
      this.overlayComponent = component
    })
  }
}
