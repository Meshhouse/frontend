import { Component, mixins } from 'nuxt-property-decorator'
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { setAuthTokens } from 'axios-jwt'
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

@Component<AuthLogin>({
  components: {
    ModalBasic,
    VueHcaptcha
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    },
    token: {
      required
    }
  }
})
export default class AuthLogin extends mixins(validationMixin) {
  email = ''
  password = ''
  token = ''

  loading = false

  get captchaKey (): string {
    return process.env.HCAPTCHA_SITE_KEY || ''
  }

  async login () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        this.loading = true

        const response = await this.$api({
          method: 'POST',
          url: 'login',
          data: {
            email: this.email,
            password: this.password
          },
          headers: {
            ...this.$generateAuthHeader('login', 'POST'),
            'h-captcha-response': this.token
          }
        })

        this.$store.commit('setUser', response.data)
        setAuthTokens({
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token
        })

        this.$emit('close')
      } catch (err) {
        this.$sentry.captureException(err)
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }

  onVerify (token: string) {
    this.token = token
  }
}
