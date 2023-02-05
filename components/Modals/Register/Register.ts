import { Component, mixins } from 'nuxt-property-decorator'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Checkbox from '@/components/common/Checkbox/Checkbox.vue'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

@Component<AuthRegister>({
  components: {
    Checkbox,
    ModalBasic
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

        this.$store.dispatch('addNotification', {
          type: 'primary',
          title: this.$t('form.registerTitle'),
          message: this.$t('notifications.register.text'),
          timeout: 10000
        })

        this.$emit('close')
      } catch (err) {
        this.$sentry.captureException(err)
        console.error(err)
      }
    }
  }
}
