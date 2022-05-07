import { Component, mixins } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

@Component<APIKeyCreateModal>({
  validations: {
    name: {
      required
    }
  }
})
export default class APIKeyCreateModal extends mixins(validationMixin) {
  name = ''

  async submit () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        const response = await this.$api({
          method: 'PUT',
          url: 'api-keys',
          data: {
            name: this.name
          },
          headers: this.$generateAuthHeader('api-keys', 'PUT')
        })

        this.$emit('success', response.data.token)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
