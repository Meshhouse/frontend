<template>
  <modal-basic
    size="two-columns"
    :title="$t('form.reset_password')"
    @close="$emit('close')"
  >
    <template slot="aside">
      <img src="/images/index/auth-img.webp">
    </template>

    <form class="content__form">
      <template v-if="currentStep === 1">
        <div class="form-field form-field--input">
          <label for="email">{{ $t('form.email') }}</label>
          <input
            id="email"
            v-model="$v.email.$model"
            class="input"
            :class="{ 'input--error': $v.email.$error }"
            type="email"
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
        <button
          class="button button--primary"
          @click.prevent="startResetPassword(false)"
        >
          {{ $t('form.reset_password') }}
        </button>
      </template>
      <template v-else-if="currentStep === 2">
        <div class="form-field form-field--input">
          <label for="codeInput">{{ $t('form.verification_code') }}</label>
          <code-input
            id="codeInput"
            ref="code-input"
            v-model="$v.code.$model"
            :length="6"
          />
          <a
            href="#"
            @click.prevent="startResetPassword(true)"
          >
            {{ $t('form.resend_email') }}
          </a>
        </div>
      </template>
      <template v-else-if="currentStep === 3">
        <div class="form-field form-field--input">
          <label for="password">{{ $t('form.password') }}</label>
          <input
            id="password"
            v-model="$v.password.$model"
            class="input"
            :class="{ 'input--error': $v.password.$error }"
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
          @click.prevent="resetPassword"
        >
          {{ $t('form.reset_password') }}
        </button>
      </template>
    </form>
    <div class="content__actions">
      <a
        href="#"
        @click.prevent="$emit('redirect', 'AuthLogin')"
      >
        {{ $t('form.actions.remembered') }}
      </a>
    </div>
  </modal-basic>
</template>

<script lang="ts" src="./ResetPassword.ts" />

<style lang="sass">
@import "ResetPassword"
</style>
