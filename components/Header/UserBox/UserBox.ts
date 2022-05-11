import { Vue, Component } from 'nuxt-property-decorator'
import LanguageSelector from '@/components/Header/LanguageSelector/LanguageSelector.vue'
import ThemeSelector from '@/components/Header/ThemeSelector/ThemeSelector.vue'

import type {
  User
} from '@/types/api/users'
@Component({
  components: {
    LanguageSelector,
    ThemeSelector
  }
})

export default class NavbarButtons extends Vue {
  get user (): User {
    return this.$store.state.user
  }

  async logout (): Promise<void> {
    const authRoutes = ['/account/profile']

    try {
      await this.$api({
        method: 'POST',
        url: 'logout',
        headers: this.$generateAuthHeader('logout', 'POST')
      })

      this.$store.commit('setUser', {
        id: -1,
        name: '',
        email: '',
        remember_me_token: null,
        role: 'basic',
        created_at: '',
        updated_at: ''
      })

      this.$cookies.remove('adonis-session')
      this.$cookies.remove('logged')

      if (authRoutes.includes(this.$route.path || '')) {
        this.$router.push(this.localePath('/'))
      }
    } catch (err) {
      console.error(err)
    }
  }
}
