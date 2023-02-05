import { Component, mixins, Watch } from 'nuxt-property-decorator'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Checkbox from '@/components/common/Checkbox/Checkbox.vue'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'
import CodeInput from '@/components/common/CodeInput/CodeInput.vue'
import { isAxiosError } from '@/functions/helpers'

@Component<ResetPassword>({
  components: {
    Checkbox,
    ModalBasic,
    CodeInput
  },
  validations (): any {
    if (this.currentStep === 1) {
      return {
        email: {
          required,
          email
        }
      }
    } else if (this.currentStep === 2) {
      return {
        code: {
          required
        }
      }
    } else if (this.currentStep === 3) {
      return {
        password: {
          required
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    }
    return {
      email: {
        required
      }
    }
  }
})
export default class ResetPassword extends mixins(validationMixin) {
  email = ''
  code = ''
  password = ''
  passwordConfirm = ''

  currentStep = 1

  async startResetPassword (force = false) {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        await this.$api({
          method: 'POST',
          url: 'reset-password',
          data: {
            email: this.email,
            force
          },
          headers: this.$generateAuthHeader('reset-password', 'POST')
        })

        this.$store.dispatch('addNotification', {
          type: 'primary',
          title: this.$t('notifications.reset_password.title'),
          message: this.$t('notifications.reset_password.email_sent'),
          timeout: 5000
        })

        this.currentStep = 2
      } catch (err) {
        this.$sentry.captureException(err)
        console.error(err)

        if (isAxiosError(err) && err.response?.status === 400) {
          this.currentStep = 2
        } else {
          this.$store.dispatch('addNotification', {
            type: 'error',
            title: this.$t('notifications.profile.title'),
            message: this.$t('notifications.profile.text_error')
          })
        }
      }
    }
  }

  async verifyCode () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        await this.$api({
          method: 'POST',
          url: 'reset-password-confirm',
          data: {
            email: this.email,
            code: this.code
          },
          headers: this.$generateAuthHeader('reset-password-confirm', 'POST')
        })

        this.currentStep = 3
      } catch (err) {
        this.$sentry.captureException(err)
        console.error(err)
        this.$refs['code-input'].reset()

        this.$store.dispatch('addNotification', {
          type: 'error',
          title: this.$t('notifications.profile.title'),
          message: this.$t('notifications.profile.text_error')
        })
      }
    }
  }

  async resetPassword () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        await this.$api({
          method: 'POST',
          url: 'reset-password-confirm',
          data: {
            email: this.email,
            code: this.code,
            password: this.password
          },
          headers: this.$generateAuthHeader('reset-password-confirm', 'POST')
        })

        this.$store.dispatch('addNotification', {
          type: 'primary',
          title: this.$t('notifications.profile.title'),
          message: this.$t('notifications.profile.text'),
          timeout: 5000
        })

        this.$emit('redirect', 'AuthLogin')
      } catch (err) {
        this.$sentry.captureException(err)
        console.error(err)

        this.$store.dispatch('addNotification', {
          type: 'error',
          title: this.$t('notifications.profile.title'),
          message: this.$t('notifications.profile.text_error')
        })
      }
    }
  }

  @Watch('code')
  handleInputCode (val: string) {
    if (val.length === 6) {
      this.verifyCode()
    }
  }
}
