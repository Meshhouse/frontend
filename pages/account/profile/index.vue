<template>
  <div>
    <div class="grid-container">
      <main class="user-profile">
        <h2 class="display-text display-text--h4">
          <span>
            {{ $t('form.profile') }}
          </span>
        </h2>
        <form>
          <div class="form-field form-field--input">
            <label for="email">{{ $t('form.email') }}</label>
            <input
              id="email"
              v-model="$v.email.$model"
              class="input"
              :class="{ 'input--error': $v.email.$error }"
              type="email"
              disabled
              autocomplete="email"
              placeholder="mail@example.com"
            >
            <small
              v-if="$v.email.$error && !$v.email.required"
              class="form-field__error"
            >
              {{ $t('validations.required', { '_field_': $t('form.email') }) }}
            </small>
            <small
              v-if="$v.email.$error && !$v.email.email"
              class="form-field__error"
            >
              {{ $t('validations.email', { '_field_': $t('form.email') }) }}
            </small>
          </div>
          <div class="form-field form-field--input">
            <label for="name">{{ $t('form.name') }}</label>
            <input
              id="name"
              v-model="$v.name.$model"
              class="input"
              :class="{ 'input--error': $v.name.$error }"
              type="test"
              placeholder="John Smith"
            >
            <small
              v-if="$v.name.$error && !$v.name.required"
              class="form-field__error"
            >
              {{ $t('validations.required', { '_field_': $t('form.name') }) }}
            </small>
            <small
              v-if="$v.email.$error && !$v.email.email"
              class="form-field__error"
            >
              {{ $t('validations.email', { '_field_': $t('form.email') }) }}
            </small>
          </div>
          <div class="form-field form-field--input">
            <label for="password">{{ $t('form.password') }}</label>
            <input
              id="password"
              v-model="$v.password.$model"
              class="input"
              :class="{ 'input--error': $v.password.$error }"
              autocomplete="new-password"
              type="password"
            >
            <small
              v-if="$v.password.$error && !$v.password.required"
              class="form-field__error"
            >
              {{ $t('validations.required', { '_field_': $t('form.password') }) }}
            </small>
          </div>
          <div class="form-field form-field--input">
            <label for="passwordConfirm">{{ $t('form.passwordConfirm') }}</label>
            <input
              id="passwordConfirm"
              v-model="$v.passwordConfirm.$model"
              class="input"
              :class="{ 'input--error': $v.passwordConfirm.$error }"
              autocomplete="new-password"
              type="password"
            >
            <small
              v-if="$v.passwordConfirm.$error && !$v.passwordConfirm.required"
              class="form-field__error"
            >
              {{ $t('validations.required', { '_field_': $t('form.passwordConfirm') }) }}
            </small>
            <small
              v-if="$v.passwordConfirm.$error && !$v.passwordConfirm.sameAsPassword"
              class="form-field__error"
            >
              {{ $t('validations.confirmed', { '_field_': $t('form.passwordConfirm'), '_target_': $t('form.password') }) }}
            </small>
          </div>
          <button
            class="button button--primary"
            @click.prevent="saveProfile"
          >
            {{ $t('common.save') }}
          </button>
        </form>
        <h2 class="display-text display-text--h4">
          <span>
            {{ $t('form.thirdParty') }}
          </span>
        </h2>
        <div class="user-profile__integrations">
          <button
            class="button button--patreon"
            disabled
          >
            {{ $t('form.connectWith', { n: 'Patreon' }) }}
            <font-awesome-icon :icon="['fab', 'patreon']" />
          </button>
          <button
            class="button button--boosty"
            disabled
          >
            {{ $t('form.connectWith', { n: 'Boosty' }) }}
            <img class="svg-inline--fa" src="/icons/brands/boosty_white.svg">
          </button>
        </div>
        <header class="models-header">
          <h2 class="display-text display-text--h4">
            <span>
              {{ $t('form.apiKeys') }}
            </span>
          </h2>
          <v-button
            color="primary"
            size="sm"
            :title="$t('form.create')"
            icon
            @click="openCreate"
          >
            <font-awesome-icon icon="plus" />
          </v-button>
        </header>
        <APIKeyBlock
          v-for="keyBlock in apiKeys"
          :key="keyBlock.id"
          :block="keyBlock"
          @delete="deleteToken"
        />
      </main>
    </div>
    <overlay
      :visible="overlayVisible"
      @close="overlayVisible = false"
    >
      <component
        :is="overlayComponent"
        :token="createdToken"
        @success="onCreateKey"
        @close="overlayVisible = false"
      />
    </overlay>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { required, email, requiredIf, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import Overlay from '@/components/Overlay/Overlay.vue'
import APIKeyCreate from '@/components/Modals/APIKeyCreate/APIKeyCreate.vue'
import APIKeySuccess from '@/components/Modals/APIKeySuccess/APIKeySuccess.vue'
import APIKeyBlock from '@/components/APIKeyBlock/APIKeyBlock.vue'

import type {
  APIToken
} from '@/types/api/users'

import type { NuxtApp } from '@nuxt/types/app'

@Component<UserProfile>({
  middleware: 'auth',
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {},
    passwordConfirm: {
      required: requiredIf(function (vm: UserProfile) {
        return vm.password.length > 0
      }),
      sameAs: sameAs('password')
    }
  },
  components: {
    APIKeyCreate,
    APIKeySuccess,
    APIKeyBlock,
    Overlay
  },
  head () {
    return {
      title: this.$t('form.profile').toString()
    }
  }
})

export default class UserProfile extends mixins(validationMixin) {
  name = ''
  email = ''
  password = ''
  passwordConfirm = ''

  overlayVisible = false
  overlayComponent = 'APIKeyCreate'
  createdToken = ''

  apiKeys: APIToken[] = []

  async asyncData ({ app }: { app: NuxtApp }): Promise<any> {
    try {
      const response = await app.$api.request<APIToken[]>({
        method: 'POST',
        url: 'api-keys',
        headers: app.$generateAuthHeader('api-keys', 'POST')
      })

      return {
        apiKeys: response.data
      }
    } catch (err) {
      console.log(err)
    }
  }

  get userData () {
    return this.$store.state.user
  }

  created () {
    const profile = this.$store.state.user
    this.name = profile.name
    this.email = profile.email
  }

  openCreate () {
    this.overlayVisible = true
    this.overlayComponent = 'APIKeyCreate'
  }

  onCreateKey (token: string) {
    this.overlayVisible = false
    this.createdToken = token
    this.fetchTokens().finally(() => {
      this.$nextTick(() => {
        this.overlayVisible = true
        this.overlayComponent = 'APIKeySuccess'
        this.fetchTokens()
      })
    })
  }

  async deleteToken (id: number) {
    try {
      await this.$api.request<APIToken[]>({
        method: 'DELETE',
        url: 'api-keys',
        data: {
          id
        },
        headers: this.$generateAuthHeader('api-keys', 'POST')
      })

      this.fetchTokens()
    } catch (err) {
      console.log(err)
    }
  }

  async fetchTokens () {
    try {
      const response = await this.$api.request<APIToken[]>({
        method: 'POST',
        url: 'api-keys',
        headers: this.$generateAuthHeader('api-keys', 'POST')
      })

      console.log(response.data)

      this.apiKeys = response.data
    } catch (err) {
      console.log(err)
    }
  }

  // eslint-disable-next-line require-await
  async saveProfile () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        await this.$api.request({
          method: 'PATCH',
          url: 'users',
          data: {
            id: this.userData.id,
            email: this.email,
            name: this.name,
            password: this.password,
            role: this.userData.role
          },
          headers: this.$generateAuthHeader('users', 'PATCH')
        })

        this.$store.dispatch('addNotification', {
          type: 'primary',
          title: 'User profile',
          message: 'User profile saved successful',
          timeout: 5000
        })
      } catch (error) {
        console.error(error)
        this.$store.dispatch('addNotification', {
          type: 'error',
          title: 'User profile',
          message: 'Somehow went wrong, open console to see more'
        })
      }
    }
  }
}
</script>
