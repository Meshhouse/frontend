import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { clearAuthTokens } from 'axios-jwt'
import type { User } from '@meshhouse/types'
import LanguageSelector from '@/components/layout/Header/LanguageSelector/LanguageSelector.vue'

@Component<UserBoxContent>({
  components: {
    LanguageSelector
  }
})

export default class UserBoxContent extends Vue {
  @Prop({ type: Boolean, default: false }) compact!: boolean

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
        role: 'basic',
        created_at: '',
        updated_at: ''
      })

      clearAuthTokens()

      if (authRoutes.includes(this.$route.path || '')) {
        this.$router.push(this.localePath('/'))
      }
    } catch (err) {
      this.$sentry.captureException(err)
      console.error(err)
    }
  }
}
