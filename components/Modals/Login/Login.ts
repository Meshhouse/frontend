import { Component, mixins } from 'nuxt-property-decorator'
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { setAuthTokens } from 'axios-jwt'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

@Component<AuthLogin>({
  components: {
    ModalBasic
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
})
export default class AuthLogin extends mixins(validationMixin) {
  email = ''
  password = ''

  async login () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        const response = await this.$api({
          method: 'POST',
          url: 'login',
          data: {
            email: this.email,
            password: this.password
          },
          headers: this.$generateAuthHeader('login', 'POST')
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
      }
    }
  }
}
