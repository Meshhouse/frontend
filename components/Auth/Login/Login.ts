import { Component, mixins } from 'nuxt-property-decorator'
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

@Component<AuthLogin>({
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
        this.$cookies.set('logged', true)

        this.$emit('close')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
