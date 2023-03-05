<template>
  <modal-basic
    size="two-columns"
    :title="$t('form.registerTitle')"
    @close="$emit('close')"
  >
    <template slot="aside">
      <img src="/images/index/auth-img.webp">
    </template>

    <form class="content__form">
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
      <div class="form-field">
        <checkbox
          v-model="$v.agreed.$model"
          :class="{ 'checkbox--error': $v.agreed.$dirty && !$v.agreed.$model }"
        >
          {{ $t('form.agreed') }}
        </checkbox>
        <small
          v-if="$v.agreed.$dirty && !$v.agreed.$model"
          class="form-field__error"
        >
          {{ $t('validations.agreed') }}
        </small>
      </div>
      <div class="form-field form-field--input">
        <VueHcaptcha
          :sitekey="captchaKey"
          @verify="onVerify"
        />
        <small
          v-if="$v.token.$error && !$v.token.required"
          class="form-field__error"
        >
          {{ $t('validations.required', { '_field_': '' }) }}
        </small>
      </div>
      <button
        class="button button--primary"
        @click.prevent="register"
      >
        {{ $t('common.submit') }}
      </button>
    </form>
    <div class="content__actions">
      <a
        href="#"
        @click.prevent="$emit('redirect', 'AuthLogin')"
      >
        {{ $t('form.actions.registered') }}
      </a>
      <a
        href="#"
        @click.prevent="$emit('redirect', 'AuthResetPassword')"
      >
        {{ $t('form.actions.forgot') }}
      </a>
    </div>
  </modal-basic>
</template>

<script lang="ts" src="./Register.ts" />

<style lang="sass">
@import "Register"
</style>
