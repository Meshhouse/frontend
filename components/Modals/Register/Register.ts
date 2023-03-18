import { Component, mixins } from 'nuxt-property-decorator'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import Checkbox from '@/components/common/Checkbox/Checkbox.vue'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

@Component<AuthRegister>({
  components: {
    Checkbox,
    ModalBasic,
    VueHcaptcha
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
    },
    token: {
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
  token = ''

  loading = false

  get captchaKey (): string {
    return process.env.HCAPTCHA_SITE_KEY || ''
  }

  async register () {
    this.$v.$touch()
    if (!this.$v.$invalid && this.agreed) {
      try {
        this.loading = true

        await this.$api({
          method: 'POST',
          url: 'register',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          headers: {
            ...this.$generateAuthHeader('register', 'POST'),
            'h-captcha-response': this.token
          }
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
      } finally {
        this.loading = false
      }
    }
  }

  onVerify (token: string) {
    this.token = token
  }
}
