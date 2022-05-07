import { Component, mixins } from 'nuxt-property-decorator'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Checkbox from '@/components/Checkbox/Checkbox.vue'

@Component<AuthRegister>({
  components: {
    Checkbox
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    },
    agreed: {
      required
    }
  }
})
export default class AuthRegister extends mixins(validationMixin) {
  name = ''
  email = ''
  password = ''
  passwordConfirm = ''
  agreed = false

  async register () {
    this.$v.$touch()
    if (!this.$v.$invalid && this.agreed) {
      try {
        await this.$api({
          method: 'POST',
          url: 'register',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          headers: this.$generateAuthHeader('register', 'POST')
        })

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
